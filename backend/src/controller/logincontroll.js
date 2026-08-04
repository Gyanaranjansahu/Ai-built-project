import connect from "../schema/model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function UserLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Required field validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    // Find user
    const user = await connect.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Compare password
    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Check SECRET_KEY
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is missing in environment variables.");
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    // Set Cookie
res.cookie("token", token, {
  // httpOnly: true ,
  // secure: process.env.NODE_ENV === "production",
  // sameSite: "none",
  // maxAge: 7 * 24 * 60 * 60 * 1000,
});

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    // Mongoose Validation Error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    // Duplicate Key Error (rare in login)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate value found.",
      });
    }

    // JWT Error
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    // Internal Server Error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
      stack:
        process.env.NODE_ENV === "development"
          ? error.stack
          : undefined,
    });
  }
}

export default UserLogin;