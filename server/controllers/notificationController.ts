import { NextFunction, Request, Response } from "express";
import cron from "node-cron";
import errorHandler from "../utils/errorHandler";
import Notification from "../models/Notification";
import catchAsyncError from "../middleware/catchAsyncError";

export const getAllNotificationsByAdmin = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await Notification.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new errorHandler("Failed to retrieve notifications.", 500));
    }
  }
);

export const markNotificationAsRead = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return next(new errorHandler("Notification not found.", 404));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification?.status;
      }

      await notification.save();
      const notifications = await Notification.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(
        new errorHandler("Failed to mark notification as read.", 500)
      );
    }
  }
);

cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await Notification.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log("Deleted read notifications. Notifications older than 30 days.");
});
