import User from "../models/User";
import { redis } from "../utils/redis";
import { IOrder } from "../models/Order";
import sendMail from "../utils/sendMail";
import errorHandler from "../utils/errorHandler";
import Notification from "../models/Notification";
import Course, { ICourse } from "../models/Course";
import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middleware/catchAsyncError";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { getAllOrders, createOrderRecord } from "../services/orderService";

export const processOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, paymentInfo } = req.body as IOrder;
      if (paymentInfo) {
        if ("id" in paymentInfo) {
          const paymentIntentId = paymentInfo.id;
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );

          if (paymentIntent.status !== "succeeded") {
            return next(
              new errorHandler("Payment failed. Please try again.", 400)
            );
          }
        }
      }

      const user = await User.findById(req.user?._id);
      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(
          new errorHandler(
            "You have already purchased this course. Please check your enrolled courses.",
            409
          )
        );
      }

      const course: ICourse | null = await Course.findById(courseId);
      if (!course) {
        return next(
          new errorHandler("Course not found. Please check the course ID.", 404)
        );
      }

      const data: any = {
        courseId: course._id?.toString() || courseId,
        userId: user?._id?.toString() || req.user?._id?.toString(),
        paymentInfo,
      };

      const orderNumber = (course._id?.toString() || courseId)
        .slice(-6)
        .toUpperCase();

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation - Course Purchase Successful",
            type: "order-confirmation",
            data: {
              userName: user.name,
              courseName: course.name,
              orderNumber: orderNumber,
              amount: course.price.toFixed(2),
              date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              courseId: course._id?.toString() || courseId,
            },
          });
        }
      } catch (error: any) {
        console.error("Order confirmation email failed:", error);
      }

      if (course._id && user) {
        user.courses.push({
          courseId: course._id.toString(),
          _id: course._id,
        } as any);
      }

      if (req.user?._id && user) {
        await redis.set(req.user._id.toString(), JSON.stringify(user));
      }

      await user?.save();
      await Notification.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order from ${course.name}`,
      });

      course.purchased = (course.purchased || 0) + 1;
      await course.save();

      createOrderRecord(data, res, next);
    } catch (error: any) {
      return next(
        new errorHandler(
          "Order processing failed. Please try again or contact support.",
          500
        )
      );
    }
  }
);

export const getAllOrdersByAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrders(res);
    } catch (error: any) {
      return next(new errorHandler("Failed to retrieve orders list.", 500));
    }
  }
);

export const sendStripePublishableKey = catchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).json({
      publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

export const createStripePaymentIntent = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        description: "Learneazy Course Payment",
        metadata: {
          company: "Learneazy",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.status(201).json({
        success: true,
        clientSecret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new errorHandler(error.message, 500));
    }
  }
);
