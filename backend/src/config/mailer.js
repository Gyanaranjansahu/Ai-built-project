import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }) => {
  // Checks if Brevo SMTP variables exist in Render
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("❌ SMTP_USER or SMTP_PASS missing in environment variables!");
    return;
  }

  // Uses Brevo SMTP relay (Allowed on Render, no port blocks)
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // Brevo SMTP Key (xsmtpsib-...)
    },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  try {
    console.log(`📡 Sending email via Brevo Nodemailer to ${to}...`);

    const info = await transporter.sendMail({
      from: `"AI Resume Analyzer" <${process.env.SENDER_EMAIL || process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html: html || `<p>${text}</p>`,
    });

    console.log("✅ Email sent successfully to:", to);
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Nodemailer Email Error:", error.message);
  }
};

export default sendEmail;