import connect from "../schema/model.js";
import { uploadImage } from "../utils/upload.js";
import fs from "fs/promises";

export default async function updateProfile(req, res) {
  try {
    const userId = req.user.id;

    // Find user
    const findUser = await connect.findById(userId);

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { name } = req.body;

    // Validate name
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // Keep existing profile image
    let profileImage = findUser.profileImage;

    // Upload new image if selected
    if (req.file) {
      try {
        const result = await uploadImage(
          req.file.path,
          "profile_images"
        );

        profileImage = result.secure_url;

        // Delete local file after successful upload
        await fs.unlink(req.file.path);
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);

        // Try deleting local file even if upload fails
        try {
          await fs.unlink(req.file.path);
        } catch (fileError) {
          console.error("File delete error:", fileError);
        }

        return res.status(500).json({
          success: false,
          message: "Failed to upload profile image",
        });
      }
    }

    // Update user
    const updatedUser = await connect.findByIdAndUpdate(
      userId,
      {
        name: name.trim(),
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
        name: updatedUser.name,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
}