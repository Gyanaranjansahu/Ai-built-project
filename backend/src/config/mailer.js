import nodemailer from "nodemailer";

const emailTransport = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  pool: true,
  maxConnections: 3,
  maxMessages: 100,

  connectionTimeout: 15000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

// Verify SMTP connection
export const verifyEmailTransport = async () => {
  try {
    await emailTransport.verify();

    console.log("=================================");
    console.log("✅ Brevo SMTP is ready");
    console.log("📧 SMTP User:", process.env.SMTP_USER);
    console.log("=================================");
  } catch (error) {
    console.error("=================================");
    console.error("❌ Brevo SMTP connection failed");
    console.error("Code:", error.code);
    console.error("Message:", error.message);
    console.error("Response:", error.response);
    console.error("=================================");
  }
};

// Send email
const sendEmail = async ({
  to,
  subject,
  text = "",
  html = "",
}) => {
  // Check environment variables
  if (!process.env.SMTP_USER) {
    throw new Error("SMTP_USER is missing");
  }

  if (!process.env.SMTP_PASS) {
    throw new Error("SMTP_PASS is missing");
  }

  // Check recipient
  if (!to) {
    throw new Error("Recipient email is required");
  }

  if (!subject) {
    throw new Error("Email subject is required");
  }

  try {
    console.log("📡 Attempting to send email...");
    console.log("📨 Recipient:", to);
    console.log("📌 Subject:", subject);

    const mailOptions = {
      from: `"AI Resume Analyzer" <${
        process.env.SENDER_EMAIL || process.env.SMTP_USER
      }>`,
      to,
      subject,
      text,
      html,
    };

    const result = await emailTransport.sendMail(mailOptions);

    console.log("=================================");
    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("📨 To:", to);
    console.log("🆔 Message ID:", result.messageId);
    console.log("📤 Response:", result.response);
    console.log("=================================");

    return {
      success: true,
      messageId: result.messageId,
      response: result.response,
    };
  } catch (error) {
    console.error("=================================");
    console.error("❌ EMAIL SENDING FAILED");
    console.error("📨 To:", to);
    console.error("❌ Code:", error.code);
    console.error("❌ Command:", error.command);
    console.error("❌ Response:", error.response);
    console.error("❌ Message:", error.message);
    console.error("=================================");

    throw error;
  }
};

export default sendEmail;