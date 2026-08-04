import connect from "../schema/model.js";
import { uploadImage } from "../utils/upload.js";
import fs from "fs";

export default async function updateProfile(req, res) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const userId = req.user.id;

    const findUser = await connect.findById(userId);

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Keep existing image by default
    let profileImage = findUser.profileImage;

    // Upload new image only if user selected one
    if (req.file) {
      const img_url = await uploadImage(req.file.path, "profile_images");
      profileImage = img_url.secure_url;

      // Delete local uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    const updatedUser = await connect.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        profileImage,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
}