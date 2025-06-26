import { Request, Response, NextFunction } from "express";
import { redis } from "../utils/redis";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsyncError from "./catchAsyncError";
import errorHandler from "../utils/errorHandler";

export const isAuthenticated = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
    if (!access_token) {
      return next(
        new errorHandler(
          "🔒 Access denied. Please sign in to your account to access this resource.",
          400
        )
      );
    }

    const decoded = jwt.decode(access_token) as JwtPayload;
    if (!decoded || !decoded.id) {
      return next(
        new errorHandler(
          "Invalid authentication token. Please sign in again to continue.",
          400
        )
      );
    }

    const user = await redis.get(decoded.id);
    if (!user) {
      return next(
        new errorHandler(
          "Your session has expired or user data is not available. Please sign in again.",
          400
        )
      );
    }

    req.user = JSON.parse(user);
    next();
  }
);
