import compression from "compression";
import helmet from "helmet";
import express from "express";
import morgan from "morgan";
import pool from "./config/db.js";
import auth from "./routes/auth.js";
import tasks from "./routes/tasks.js";
import cors from "cors";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(compression());
app.use(express.json({ limit: "10kb" })); // protects server from large payload attacks
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(morgan("dev"));
app.use(apiLimiter);

app.get("/", (req, res) => {
  res.send("API running");
});
app.use("/auth", auth);
app.use("/tasks", tasks);

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok" });
  } catch {
    res.status(500).json({ status: "db_error" });
  }
});

// Global Error Handler
app.use(errorHandler);

export default app;
