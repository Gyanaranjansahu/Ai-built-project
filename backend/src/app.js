import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Database
import connectDB from "./config/database.js";

// Mailer
import "./config/mailer.js";

// Routes
import signup from "./router/authrouter.js";
import Login from "./router/loginroute.js";
import LogoutRoute from "./router/logoutroute.js";
import userRoute from "./router/userroute.js";
import interviewRouter from "./router/interview.js";

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONT_END,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running successfully 🚀",
  });
});

// Authentication Routes
app.use("/api/auth", signup);
app.use("/api/auth", Login);
app.use("/api/auth", LogoutRoute);
app.use("/api/auth", userRoute);

// Interview Routes
app.use("/api/interview", interviewRouter);

// 404 Route
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;