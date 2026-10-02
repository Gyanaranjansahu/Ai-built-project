import connect from "../schema/model.js";

export default async function getAllUser(req, res) {
  try {
    const allUser = await connect
      .find({})
      .select("-password -role");

    if (allUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users: allUser,
    });

  } catch (error) {
    console.error("Get all users error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}