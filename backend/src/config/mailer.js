import nodemailer from "nodemailer";

const email_transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, // Gmail App Password
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.EMAIL || !process.env.PASSWORD) {
    console.error("❌ EMAIL or PASSWORD is missing from environment variables.");
    return; // don't throw — caller should never let email failure break signup
  }

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
    // swallow the error here too — caller continues even if email fails
  }
};

export default sendEmail;