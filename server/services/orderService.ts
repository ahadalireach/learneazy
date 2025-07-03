import { Response } from "express";
import Order from "../models/Order";
import catchAsyncError from "../middleware/catchAsyncError";

export const createOrderRecord = catchAsyncError(
  async (data: any, res: Response) => {
    const order = await Order.create(data);

    res.status(201).json({
      succcess: true,
      order,
    });
  }
);

export const getAllOrders = async (res: Response) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    orders,
  });
};
