import "dotenv/config";
import nodemailer from "nodemailer";

const email_transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  // Render latency handling ke liye Timeouts badha dein
  connectionTimeout: 30000, // 30 seconds
  greetingTimeout: 30000,
  socketTimeout: 30000,
  dnsTimeout: 30000,
});

email_transport.verify((error) => {
  if (error) {
    console.error("❌ SMTP Connection Failed:", error.message);
  } else {
    console.log("✅ SMTP Server Ready to send emails!");
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    if (!process.env.EMAIL || !process.env.PASSWORD) {
      throw new Error("EMAIL or PASSWORD is missing from environment variables.");
    }

    const result = await email_transport.sendMail({
      from: `"AI Resume Analyzer" <${process.env.EMAIL}>`,
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