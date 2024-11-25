import redisCleint from "../config/redisClient.js";

const rateLimiter = (bucketSize, refillRate, refillIntervel) => {
  return async (req, res, next) => {
    const key = `rate-limiter:${req.ip}`;
    const now = Date.now();

    try {
      const bucket = await redisCleint.hGetAll(key);

      let tokens = bucket.tokens ? parseFloat(bucket.tokens) : bucketSize;
      const lastRefill = bucket.lastRefill ? parseInt(bucket.lastRefill) : now;

      const elapsedTime = now - lastRefill;
      const tokenToAdd = Math.floor(
        (elapsedTime / refillIntervel) * refillRate
      );

      tokens = Math.min(bucketSize, tokens + tokenToAdd);

      if (tokens > 0) {
        tokens = tokens - 1;

        await redisCleint.hSet(key, {
          tokens: tokens.toString(),
          lastRefill: now.toString(),
        });

        await redisCleint.expire(key, Math.ceil(bucketSize / refillRate));
        next();
      } else {
        res
          .status(429)
          .json({ error: "Limit Exceeded, Please try again later" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("internal server error");
    }
  };
};

export default rateLimiter;
