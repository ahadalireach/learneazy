import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddlware } from "./middleware/error";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Basic health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully.",
    timestamp: new Date().toISOString(),
    database: "Connected",
  });
});

// 404 handler for undefined routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`API route ${req.originalUrl} not found!`) as any;
  err.statusCode = 404;
  next(err);
});

// Global error handling middleware (must be last)
app.use(errorMiddlware);
