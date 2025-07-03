import "colors";
import dotenv from "dotenv";
dotenv.config();

import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import connectDB from "./db/db";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import courseRoutes from "./routes/courseRoutes";
import layoutRoutes from "./routes/layoutRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import { v2 as cloudinary } from "cloudinary";
import { errorMiddlware } from "./middleware/error";

const PORT = process.env.PORT || 4000;

// Create Express app
export const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/layouts", layoutRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);

// Basic health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully.",
    timestamp: new Date().toISOString(),
    database: "Connected!",
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

const startServer = async () => {
  try {
    await connectDB();

    // Start the server only after successful database connection
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.green.underline.bold);
      console.log(
        `Health check available at: http://localhost:${PORT}/health`.blue
          .underline.bold
      );
    });
  } catch (error) {
    console.error("Failed to start server:".red.bold, (error as Error).message);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`.red.bold);
  console.log("Shutting down server...");
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: any) => {
  console.log(`Unhandled Rejection: ${err.message}`.red.bold);
  console.log("Shutting down server...");
  process.exit(1);
});

startServer();
