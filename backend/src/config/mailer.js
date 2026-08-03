// sendEmail.js
import nodemailer from "nodemailer";

// 🔹 Reusable transporter with connection pooling + timeouts
// Pooling avoids re-authenticating on every call (faster + more reliable)
// Timeouts make it FAIL FAST instead of hanging the request if the
// deployment host is blocking SMTP ports (common on Render/Vercel free tiers)
const email_transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, // must be a Gmail App Password, not your login password
  },
  pool: true,
  maxConnections: 3,
  connectionTimeout: 10000, // 10s to establish connection
  greetingTimeout: 10000,   // 10s to get SMTP greeting
  socketTimeout: 15000,     // 15s of inactivity before giving up
});

// Verify transporter config once at startup (logs a clear error early
// instead of failing silently deep inside a signup request later)
email_transport.verify((error) => {
  if (error) {
    console.error("❌ Email transporter verification failed:", error.message);
  } else {
    console.log("✅ Email transporter ready");
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.EMAIL || !process.env.PASSWORD) {
    console.error("❌ EMAIL or PASSWORD is missing from environment variables.");
    return; // don't throw — caller should never let email failure break signup
  }

  try {
    const result = await email_transport.sendMail({
      from: `"Your App Name" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent successfully to:", to);
    return result;
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    // swallow the error here too — see note below on why
  }
};

export default sendEmail;