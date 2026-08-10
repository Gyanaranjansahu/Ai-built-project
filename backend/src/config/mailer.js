import nodemailer from "nodemailer";

// Initialize transport using explicit Brevo SMTP config rather than Gmail
// Render blocks outbound Gmail SMTP ports (465/587)
const email_transport = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Brevo SMTP Key (xsmtpsib-...)
  },
  pool: true, // Reuse connections rather than creating a new one per email
  maxConnections: 3,
  connectionTimeout: 10000, // 10s connection timeout for cloud platforms
  greetingTimeout: 5000,
  socketTimeout: 10000,
});

const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("❌ SMTP_USER or SMTP_PASS is missing from environment variables.");
    return;
  }

  try {
    // Verify SMTP connection config
    await email_transport.verify();
console.log("📡 Attempting to send email to:", user.email); /
    const result = await email_transport.sendMail({
      from: `"AI Resume Analyzer" <${process.env.SENDER_EMAIL || process.env.SMTP_USER}>`,
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
      console.error("👉 Check if your Brevo SMTP key is correct.");
    }
  }
};

export default sendEmail;