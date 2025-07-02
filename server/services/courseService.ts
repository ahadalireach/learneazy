import { Response } from "express";
import Course from "../models/Course";
import catchAsyncError from "../middleware/catchAsyncError";

export const uploadCourse = catchAsyncError(
  async (data: any, res: Response) => {
    const course = await Course.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);
