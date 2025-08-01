import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // MongoDB CastError - Invalid ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}: ${err.value}`;
    err = new errorHandler(message, 404);
  }

  // MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `${
      field.charAt(0).toUpperCase() + field.slice(1)
    } '${value}' already exists. Please use a different ${field}.`;
    err = new errorHandler(message, 409);
  }

  // JWT Invalid Token Error
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid authentication token. Please log in again.";
    err = new errorHandler(message, 401);
  }

  // JWT Expired Token Error
  if (err.name === "TokenExpiredError") {
    const message = "Your session has expired. Please log in again.";
    err = new errorHandler(message, 401);
  }

  // MongoDB Validation Error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((val: any) => val.message);
    const message = `Validation failed: ${errors.join(", ")}`;
    err = new errorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
