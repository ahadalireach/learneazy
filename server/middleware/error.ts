import { Request, Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";

export const errorMiddlware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server Error!";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ID: ${err.path}.`;
    err = new errorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key entered: ${Object.keys(err.keyValue)}.`;
    err = new errorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `JWT is invalid. Please try again.`;
    err = new errorHandler(message, 400);
  }

  // jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `JWT has expired. Please try again.`;
    err = new errorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
