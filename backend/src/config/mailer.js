import "dotenv/config";
import nodemailer from "nodemailer";

const email_transport = nodemailer.createTransport({
  service: "gmail",
  pool:true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
    connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    console.log(process.env.EMAIL);
    
    const result = await email_transport.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent successfully");
    console.log("Message ID:", result.messageId);

    return result;
  } catch (error) {
    console.log("Email error:", error);
  }
};

export default sendEmail;