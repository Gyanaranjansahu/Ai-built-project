import "dotenv/config";
import nodemailer from "nodemailer";

const email_transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,            // ⚠️ 465 ki jagah 587 use karein
  secure: false,         // 587 ke saath mandatory false hota hai (STARTTLS)
  family: 4,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },

  tls: {
    rejectUnauthorized: false,
    ciphers: "SSLv3",
  },
  // Render latency handling ke liye Timeouts badha dein
connectionTimeout: 10000, // Reduced to 10s to fail fast
  greetingTimeout: 10000,
  socketTimeout: 10000,
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