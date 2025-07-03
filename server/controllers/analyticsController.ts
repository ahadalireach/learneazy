import { Request, Response, NextFunction } from "express";
import { generateLast12MothsData } from "../utils/analyticsGenerator";
import User from "../models/User";
import Order from "../models/Order";
import Course from "../models/Course";
import errorHandler from "../utils/errorHandler";
import catchAsyncError from "../middleware/catchAsyncError";

export const getUserAnalyticsByAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MothsData(User);
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(
        new errorHandler(
          "Failed to retrieve user analytics. Please try again.",
          500
        )
      );
    }
  }
);

export const getCourseAnalyticsByAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MothsData(Course);
      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(
        new errorHandler(
          "Failed to retrieve course analytics. Please try again.",
          500
        )
      );
    }
  }
);

export const getOrderAnalyticsByAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MothsData(Order);
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(
        new errorHandler(
          "Failed to retrieve order analytics. Please try again.",
          500
        )
      );
    }
  }
);
