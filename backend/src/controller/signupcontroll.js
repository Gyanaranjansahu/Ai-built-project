import sendEmail, { createClassicWelcomeEmail } from "../config/mailer.js";
import connect from "../schema/model.js";
import bcrypt from "bcrypt";
import fs from "fs";
import { uploadImage } from "../utils/upload.js";

export default async function add(req, res) {
  let filePath = null;

  try {
    const { name, email, password } = req.body;

    // =====================================================
    // 1. BASIC VALIDATION
    // =====================================================
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!cleanEmail) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // =====================================================
    // 2. CHECK IF USER ALREADY EXISTS
    // =====================================================
    const existingUser = await connect.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // =====================================================
    // 3. CREATE ADMIN IF ADMIN DOES NOT EXIST
    // =====================================================
    const checkAdmin = await connect.findOne({
      role: "admin",
    });

    if (!checkAdmin) {
      const adminPassword = await bcrypt.hash("Admin@2005", 10);

      await connect.create({
        name: "gyana",
        email: "gyanaadmin@gmail.com",
        password: adminPassword,
        profileImage:
          "https://res.cloudinary.com/xe0gnpw8/image/upload/v1698234567/default-profile-image.png",
        role: "admin",
      });

      console.log("Admin created successfully");
    }

    // =====================================================
    // 4. CHECK PROFILE IMAGE
    // =====================================================
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    filePath = file.path;

    // =====================================================
    // 5. UPLOAD IMAGE TO CLOUDINARY
    // =====================================================
    const imageResult = await uploadImage(filePath, "profile_images");

    if (!imageResult || !imageResult.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload profile image",
      });
    }

    const profileImage = imageResult.secure_url;

    // =====================================================
    // 6. HASH PASSWORD
    // =====================================================
    const hashpass = await bcrypt.hash(password, 10);

    // =====================================================
    // 7. CREATE USER
    // =====================================================
    const user = await connect.create({
      name: cleanName,
      email: cleanEmail,
      password: hashpass,
      profileImage: profileImage,
      role: "user",
    });

    console.log("User created:", user.email);

    // =====================================================
    // 8. DELETE LOCAL IMAGE
    // =====================================================
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log("Local image deleted");
      }
      filePath = null;
    } catch (fileError) {
      console.error("Failed to delete local image:", fileError.message);
    }

    // =====================================================
    // 9. SEND WELCOME EMAIL (Classic Luxury Template)
    // =====================================================
    try {
      await sendEmail({
        to: user.email,
        subject: "Welcome to ResumeAI — Your Intelligent Career Copilot",
        text: `Welcome ${user.name}! Your ResumeAI account has been created successfully. You can now analyze your resume, calculate your ATS score, and generate tailored interview preparation plans.`,
        html: createClassicWelcomeEmail({ name: user.name }),
      });
      console.log("Welcome email sent successfully");
    } catch (emailError) {
      // Email failure should NOT fail signup
      console.error("Welcome email notice:", emailError.message);
    }

    // =====================================================
    // 10. SUCCESS RESPONSE
    // =====================================================
    return res.status(201).json({
      success: true,
      message: "Signup successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);

    // DELETE LOCAL FILE IF ERROR OCCURRED
    if (filePath) {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("Temporary file cleaned");
        }
      } catch (fileError) {
        console.error("File cleanup failed:", fileError.message);
      }
    }

    // MONGOOSE VALIDATION ERROR
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

    // DUPLICATE KEY ERROR
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `${field} already exists`,
      });
    }

    // GENERAL SERVER ERROR
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
