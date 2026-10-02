import connect from "../schema/model.js";
import interviewReportModel from "../schema/interview.model.js";

export default async function deleteProfile(req, res) {
  try {
    const userId = req.user.id;

    // 1. Delete user from database
    await connect.findByIdAndDelete(userId);

    // 2. Delete all interview reports belonging to this user
    await interviewReportModel.deleteMany({ user: userId });

    // 3. Clear auth cookie properly
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
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error("deleteProfile Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete profile",
    });
  }
}
