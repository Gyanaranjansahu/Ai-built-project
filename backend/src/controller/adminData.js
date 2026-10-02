import connect from "../schema/model.js";

export default async function getAdmin(req, res) {
  try {
    // Check authentication
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Check admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    // Find admin
    const adminData = await connect.findOne({
      role: "admin",
    }).select("-password");

    if (!adminData) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin data fetched successfully",
      adminData,
    });

  } catch (error) {
    console.error("Get admin error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}