import "colors";
import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "";

const connectDB = async (): Promise<void> => {
  try {
    console.log("Checking MongoDB URI...".blue);

    if (!MONGO_URI) {
      console.error("MONGO_URI environment variable is not defined".red.bold);
      console.log(
        "Available environment variables:".yellow,
        Object.keys(process.env).filter((key) => key.includes("MONGO"))
      );
      throw new Error("MONGO_URI environment variable is not defined");
    }

    console.log("MongoDB URI found, attempting connection...".green);
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB connected successfully!`.yellow.underline.bold);
    console.log(`Database Host: ${conn.connection.host}`.underline.cyan);
    console.log(`Database Name: ${conn.connection.name}`.underline.cyan);
  } catch (error: any) {
    console.error("MongoDB connection failed:".red.bold, error.message);
    throw error;
  }
};

export default connectDB;
