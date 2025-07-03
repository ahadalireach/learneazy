import { Response } from "express";
import Course from "../models/Course";
import catchAsyncError from "../middleware/catchAsyncError";

export const createCourse = catchAsyncError(
  async (data: any, res: Response) => {
    const course = await Course.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);

export const getAllCourses = async (res: Response) => {
  const courses = await Course.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};
