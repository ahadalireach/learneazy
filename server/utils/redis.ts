import "colors";
import Redis from "ioredis";

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("Redis URL found, initializing Redis client...".white.bold);
    return process.env.REDIS_URL;
  } else {
    console.error("Redis URL not found in environment variables.".red.bold);
    throw new Error("Redis URL is required to connect to Redis.");
  }
};

export const redis = new Redis(redisClient());
