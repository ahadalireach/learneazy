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
import { rateLimit } from "express-rate-limit";
import { errorMiddleware } from "./middleware/error";

// Connect DB and configure cloudinary
connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Express app
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://learneazy.vercel.app",
    credentials: true,
  })
);

// Other middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  },
});

// Apply rate limiting to all routes
app.use(limiter);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LearnEazy API is running successfully!",
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/layouts", layoutRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/notifications", notificationRoutes);

// 404 handler for undefined routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`API route ${req.originalUrl} not found!`) as any;
  err.statusCode = 404;
  next(err);
});

// Global error handling middleware (must be last)
app.use(errorMiddleware);

// For local development, start the server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
  });
}

// For Vercel: export the app as default
export default app;
