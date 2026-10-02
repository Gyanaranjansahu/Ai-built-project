import blacklist from "../schema/blacklistSchema.js";

const Logout = async (req, res) => {
  try {
    let token = req.cookies?.token;

    if (!token && req.headers?.authorization) {
      const parts = req.headers.authorization.split(" ");
      token = parts.length === 2 ? parts[1] : req.headers.authorization;
    }

    if (token) {
      try {
        await blacklist.create({ token });
      } catch (blError) {
        // Token might already be blacklisted, continue
      }
    }

    const isProduction =
      process.env.NODE_ENV === "production" ||
      !!process.env.RENDER ||
      !!process.env.VERCEL;

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logout successful",
      text: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      text: "internal server error",
    });
  }
};

export default Logout;
