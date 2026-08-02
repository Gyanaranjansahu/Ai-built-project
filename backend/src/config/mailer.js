import nodemailer from "nodemailer";

if (!process.env.EMAIL || !process.env.PASSWORD) {
  console.error("❌ EMAIL or PASSWORD missing in environment variables");
}

const email_transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },

  // Prevent hanging requests
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Check SMTP connection
(async () => {
  try {
    await email_transport.verify();
    console.log("✅ Email Transport is ready");
  } catch (error) {
    console.error("❌ Email Transport Error:", error.message);
  }
})();


const sendEmail = async ({ to, subject, text, html }) => {
  try {
    if (!process.env.EMAIL || !process.env.PASSWORD) {
      throw new Error(
        "EMAIL or PASSWORD is missing from environment variables"
      );
    }

    const result = await email_transport.sendMail({
      from: `"AI Resume Analyzer" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", to);

    return result;

  } catch (error) {
    console.error("❌ Send Email Error:", error.message);
    throw error;
  }
};


export default sendEmail;