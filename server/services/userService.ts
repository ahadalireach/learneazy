import { Response } from "express";
import { redis } from "../utils/redis";
import User from "../models/User";

export const getUserProfileFromCache = async (id: string, res: Response) => {
  const userJson = await redis.get(id);

  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

export const getAllUsers = async (res: Response) => {
  const users = await User.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

export const changeUserRole = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
};
