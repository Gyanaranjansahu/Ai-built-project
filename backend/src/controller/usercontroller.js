import connect from "../schema/model.js";

async function userController(req, res) {
  try {
    // If req.user doesn't exist, user is not logged in
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await connect
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export default userController;