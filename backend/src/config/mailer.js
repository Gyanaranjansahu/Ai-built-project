import "dotenv/config";
import nodemailer from "nodemailer";

const email_transport = nodemailer.createTransport({
  service: "gmail", // 🔹 Render ke port 587 block issue ko bypass karne ke liye service use karein
  family: 4,        // 🔹 Force IPv4
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    if (!process.env.EMAIL || !process.env.PASSWORD) {
      throw new Error("EMAIL or PASSWORD is missing from environment variables.");
    }

    const result = await email_transport.sendMail({
      from: `<${process.env.EMAIL}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent successfully to:", to);
    return result;
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    throw error;
  }
};

export default sendEmail;