import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import blacklist from "../schema/blacklistSchema.js";

dotenv.config();

const checkAuth = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        text: "Token not found",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check blacklist
    const blacklistedToken = await blacklist.findOne({ token });

    if (blacklistedToken) {
      return res.status(401).json({
        success: false,
        text: "Token has been blacklisted",
      });
    }

    // Save decoded user information
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      text: error.message,
    });
  }
};

export default checkAuth;