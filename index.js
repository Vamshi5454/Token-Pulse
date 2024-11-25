import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
