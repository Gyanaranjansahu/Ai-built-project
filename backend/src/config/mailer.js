import { Resend } from "resend";


const email_transport = new Resend(process.env.RESEND_API_KEY);
const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing from environment variables.");
    return; // don't throw — caller should never let email failure break signup
  }

  try {
    const result = await email_transport.emails.send({
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