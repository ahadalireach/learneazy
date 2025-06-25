import "colors";
import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import connectDB from "./utils/db";
const PORT = process.env.PORT || 4001;

const startServer = async () => {
  try {
    await connectDB();

    // Start the server only after successful database connection
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
