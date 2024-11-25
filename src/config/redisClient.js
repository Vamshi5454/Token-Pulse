// const redis = require("redis");
import redis from "redis";
import dotenv from "dotenv";
// require("dotenv").config();
dotenv.config();
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
})();

export default redisClient;
