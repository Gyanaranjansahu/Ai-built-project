import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.EMAIL || !process.env.PASSWORD) {
    console.error("❌ EMAIL or PASSWORD is missing from environment variables.");
    return;
  }

  // Create transporter inside the call without pooling
  // This prevents hanging sockets on cloud hosting providers like Render
  const email_transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD, // 16-character App Password (no spaces)
    },
    tls: {
      rejectUnauthorized: false, // Prevents certificate verification timeouts on Render
    },
    connectionTimeout: 15000, // Give Render enough room for DNS + handshake
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  try {
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
      console.error("👉 Check your App Password or Google Security alerts.");
    } else if (error.code === "ETIMEDOUT" || error.code === "ESOCKET") {
      console.error("👉 Render firewall is blocking outbound SMTP ports (465/587). Consider switching to HTTP API like Resend.");
    }
  }
};

export default sendEmail;