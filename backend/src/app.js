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
import profileRouter from "./router/profile.js";

const app = express();
// Middlewares
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONT_END],
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

app.use("/api/profile", profileRouter);
app.use("/api/profile",profileRouter);
export default app;