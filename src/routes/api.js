import express from "express";

import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

const BucketSize = 10;
const RefillRate = 2;
const RefillIntervel = 1000;

router.get(
  "/",
  rateLimiter(BucketSize, RefillRate, RefillIntervel),
  (req, res) => {
    res.json({ message: "Request Successful" });
  }
);

export default router;
