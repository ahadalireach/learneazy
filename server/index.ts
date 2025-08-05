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

// Connect DB and configure cloudinary if needed (for local/dev)
connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Express app
const app = express();

// Trust proxy for Vercel/production environment
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// CORS must be first
const allowedOrigins = [
  "https://learneazy.vercel.app",
  "http://localhost:3000",
  "https://learneazy-api.vercel.app",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cookie",
      "X-Requested-With",
    ],
    optionsSuccessStatus: 200, // For legacy browser support
  })
);

// Other middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting middleware - properly configured for Vercel
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skip: (req) => {
    return !req.ip && !req.connection.remoteAddress;
  },
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress || "unknown";
  },
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  },
});

// Apply rate limiting to all routes
app.use(limiter);

// Debug middleware to log all requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LearnEazy API is running successfully!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "/health",
      users: "/api/users",
      courses: "/api/courses",
      orders: "/api/orders",
      layouts: "/api/layouts",
      analytics: "/api/analytics",
      notifications: "/api/notifications",
    },
  });
});

// Simple API test route
app.get("/api", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is working!",
    timestamp: new Date().toISOString(),
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
