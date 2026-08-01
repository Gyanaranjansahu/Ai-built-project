import "dotenv/config";
import nodemailer from "nodemailer";

// 1. Explicit Host aur Port 465 (SSL) use karein - Production me sabse reliable hai
const email_transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL security
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, // DHYAN RHE: Ye Google App Password hi hona chahiye!
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// 2. Server setup ke time connection test karne ke liye (Debugging helpful hai)
email_transport.verify((error) => {
  if (error) {
    console.error("❌ SMTP Connection Failed:", error.message);
  } else {
    console.log("✅ SMTP Server Ready to send emails!");
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Basic Environment Variable Check
    if (!process.env.EMAIL || !process.env.PASSWORD) {
      throw new Error("EMAIL or PASSWORD is not defined in environment variables.");
    }

    const result = await email_transport.sendMail({
      from: `"AI Resume Analyzer" <${process.env.EMAIL}>`, // Proper Sender Format
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent successfully to:", to);
    console.log("Message ID:", result.messageId);

    return result;
  } catch (error) {
    // Full error detail production logs me dikhne ke liye:
    console.error("❌ Email Error:", {
      message: error.message,
      code: error.code,
    });

    // Error throw karein taaki aapka API Controller status 500 bhej sake
    throw error; 
  }
};

export default sendEmail;