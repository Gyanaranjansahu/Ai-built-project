import sendEmail from "../config/mailer.js";
import connect from "../schema/model.js";
import bcrypt from "bcrypt";
import fs from "fs";
import {uploadImage} from "../utils/upload.js";

export default async function add(req, res) {
  try {
    const { name, email, password } = req.body;

    // 1. Basic empty field check
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Pre-check if user already exists
    const existingUser = await connect.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }
    
    // 3. Hash password
    const hashpass = await bcrypt.hash(password, 10);
    const file=req.file;


if (!file) {
  return res.status(400).json({
    success: false,
    message: "Profile image is required",
  });
}
const path=file.path;
const imageUrl = await uploadImage(path, "profile_images");
    // 4. Create user in database
    const user = await connect.create({
      name,
      email,
      password: hashpass,
      profileImage: imageUrl.secure_url, // Store the Cloudinary URL
    });
fs.unlinkSync(path); // Delete the local file


 await sendEmail({
        to: user.email,
        subject: "Welcome to AI Resume Analyzer 🎉",
        text: `Welcome ${user.name}! Your account has been created successfully.`,
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f5f7fb;">
            <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; border: 1px solid #e5e7eb;">
              <!-- Logo / App Name -->
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="margin: 0; color: #4f46e5; font-size: 28px;">AI Resume Analyzer</h1>
                <p style="margin: 8px 0 0; color: #6b7280; font-size: 14px;">Build a stronger resume. Prepare for better opportunities.</p>
              </div>

              <!-- Welcome Header -->
              <h2 style="color: #111827; font-size: 22px; margin-bottom: 15px;">Welcome, ${user.name}! 👋</h2>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.7;">
                Thank you for creating your account with <strong>AI Resume Analyzer</strong>. Your account is now ready to help you analyze, improve, and optimize your resume.
              </p>

              <!-- Features Box -->
              <div style="background-color: #f8f9ff; border-radius: 10px; padding: 20px; margin: 25px 0;">
                <p style="margin: 0 0 12px; font-weight: bold; color: #111827;">What you can do:</p>
                <p style="margin: 8px 0; color: #4b5563;">✓ Analyze your resume</p>
                <p style="margin: 8px 0; color: #4b5563;">✓ Check your ATS score</p>
                <p style="margin: 8px 0; color: #4b5563;">✓ Identify skill gaps</p>
                <p style="margin: 8px 0; color: #4b5563;">✓ Get personalized interview preparation</p>
              </div>

              <!-- Call to Action -->
              <div style="text-align: center; margin: 30px 0;">
                <a stroke-linecap="round" href="https://ai-resume-analyzer-app-five.vercel.app/" style="display: inline-block; background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 13px 28px; border-radius: 7px; font-size: 15px; font-weight: bold;">
                  Start Analyzing Your Resume
                </a>
              </div>

              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                We're excited to have you on board. Start by uploading your resume and let AI help you understand where you stand and how you can improve.
              </p>

              <p style="color: #4b5563; font-size: 14px; margin-top: 30px;">
                Best regards,<br>
                <strong>AI Resume Analyzer Team</strong>
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
              <p style="margin: 5px 0;">© 2026 AI Resume Analyzer</p>
              <p style="margin: 5px 0;">This is an automated email. Please do not reply.</p>
            </div>
          </div>
        `,
    }).catch((emailError) => {
      // User already created and already responded to — just log this.
      console.error("⚠️ User created, but failed to send welcome email:", emailError.message);
    });


    // 5. Return success response FIRST — don't make the user wait on SMTP.
    // Everything the client needs (user created + saved) is already true at this point.
    res.status(201).json({
      success: true,
      message: "Signup successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    // 6. Send Welcome Email in the background (fire-and-forget).
    // This runs AFTER the response has already been sent to the client,
    // so a slow or blocked SMTP connection can no longer delay signup.
    // We don't await it, and .catch() ensures a failure here can never
    // crash the process or throw an unhandled promise rejection.
  
  } catch (error) {
    console.error("❌ Signup Error:", error);

    // Mongoose Validation Error
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

    // MongoDB Duplicate Key Error
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `${field} already exists`,
      });
    }

    // Internal Server Error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}