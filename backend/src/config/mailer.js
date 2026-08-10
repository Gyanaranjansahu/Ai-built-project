import nodemailer from "nodemailer";

// Initialize transport using explicit SMTP config rather than `service: "gmail"`
// Cloud providers (Render, Vercel, Heroku, AWS) often get blocked when using the simple service tag.
const email_transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465 (SSL)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, // Must be a 16-character App Password
  },
  pool: true, // Reuse connections rather than creating a new one per email
  maxConnections: 3,
  connectionTimeout: 10000, // 10s connection timeout for cloud platforms
  greetingTimeout: 5000,
  socketTimeout: 10000,
});

const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.EMAIL || !process.env.PASSWORD) {
    console.error("❌ EMAIL or PASSWORD is missing from environment variables.");
    return;
  }

  try {
    // Verify SMTP connection config (helpful for catching bad credentials or IP blocks early)
    await email_transport.verify();

    const result = await email_transport.sendMail({
      from: `"AI Resume Analyzer" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent successfully to:", to);
    console.log("Message ID:", result.messageId);

    return result;
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    if (error.code === "EAUTH") {
      console.error("👉 Check if your App Password is correct or if Google blocked the sign-in attempt from your cloud server IP.");
    }
  }
};

export default sendEmail;