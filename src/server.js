import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(rateLimiter);
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/transactions", transactionsRoute);
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
