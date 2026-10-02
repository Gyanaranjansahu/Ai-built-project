import env from "dotenv/config";
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
import AdminAccess from "./router/adminrouter.js";

const app = express();

// Allowed Origins List (Evaluates env variables + fallbacks)
const allowedOrigins = [
  process.env.FRONT_END,
  "https://ai-resume-analyzer-app-five.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean); // Clean out undefined/empty variables

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy error: Origin ${origin} is not allowed`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(cookieParser());
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

app.use("/api", AdminAccess);

export default app;