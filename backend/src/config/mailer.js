import nodemailer from "nodemailer";

/**
 * Creates a fresh, serverless-safe Nodemailer transport instance on demand.
 * Purely relies on environment variables (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS).
 */
const createTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const isSecure = port === 465;

  if (!host) {
    throw new Error("Missing SMTP_HOST environment variable");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure, // true for 465, false for 587/25/2525
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Serverless optimizations for Vercel / Render / AWS Lambda
    pool: false, // Disables socket pooling to avoid freeze on cold starts
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 8000,
    socketTimeout: 15000,
  });
};

/**
 * Diagnostic helper to test SMTP connection state
 */
export const verifyEmailTransport = async () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("⚠️️ SMTP credentials missing (Check SMTP_HOST, SMTP_USER, or SMTP_PASS in .env)");
    return false;
  }

  try {
    const transport = createTransporter();
    await transport.verify();
    console.log("=================================");
    console.log("✅ SMTP Server is ready");
    console.log("🌐 Host:", process.env.SMTP_HOST);
    console.log("📧 User:", process.env.SMTP_USER);
    console.log("=================================");
    return true;
  } catch (error) {
    console.warn("=================================");
    console.warn("⚠️ SMTP connection verification failed:", error.message);
    console.warn("=================================");
    return false;
  }
};

/**
 * Generates a classic, executive-styled HTML welcome email
 */
export function createClassicWelcomeEmail({ name = "Candidate" }) {
  const frontEndUrl = process.env.FRONT_END || "https://ai-resume-analyzer-app-five.vercel.app";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ResumeAI</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: 'Georgia', 'Times New Roman', serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0b0f19; width: 100%; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          
          <!-- Top Gold Accent Line -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #d4af37, #f59e0b, #d4af37);"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 25px 40px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
              <div style="display: inline-block; padding: 6px 16px; border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 30px; background-color: rgba(212, 175, 55, 0.08); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #d4af37; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 600; margin-bottom: 16px;">
                Executive Career Suite
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 0.5px; color: #ffffff;">
                Resume<span style="color: #38bdf8;">AI</span>
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #94a3b8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Smart Career &amp; ATS Intelligence
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 35px 40px;">
              <h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 600; color: #f8fafc; font-family: 'Georgia', serif;">
                Welcome, ${name}.
              </h2>
              
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.7; color: #cbd5e1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Your account has been officially registered with <strong>ResumeAI</strong>. You now have access to our algorithmic resume benchmarking, ATS parsing analytics, and AI-driven interview preparation suite.
              </p>

              <!-- Platform Highlights Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #141e33; border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 12px; margin: 24px 0; padding: 20px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #38bdf8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      Your Platform Privileges:
                    </p>
                    <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 14px; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      <li><strong style="color: #e2e8f0;">ATS Benchmark Engine:</strong> Uncover keyword mismatches and formatting filters.</li>
                      <li><strong style="color: #e2e8f0;">Targeted Skill Gap Audit:</strong> Precise recommendations for your target roles.</li>
                      <li><strong style="color: #e2e8f0;">Interview Copilot:</strong> Tailored technical &amp; behavioral question sets.</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Call to Action -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0 15px 0;">
                <tr>
                  <td align="center">
                    <a href="${frontEndUrl}/analyze" target="_blank" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #4f46e5, #0ea5e9); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-shadow: 0 4px 14px rgba(14, 165, 233, 0.4);">
                      Launch Your Resume Analysis &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 25px 0 0 0; font-size: 13px; line-height: 1.6; color: #64748b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center;">
                Need help or have suggestions? Reply directly to this email or visit our Help Center.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0b1120; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                &copy; ${new Date().getFullYear()} ResumeAI Platform. Crafted for career excellence.
              </p>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #475569; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                This is an automated notification regarding your account registration.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Core Nodemailer Email Dispatcher
 */
const sendEmail = async ({ to, subject, text = "", html = "" }) => {
  if (!to) throw new Error("Recipient email is required");
  if (!subject) throw new Error("Email subject is required");

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("❌ Missing required SMTP environment variables (SMTP_HOST, SMTP_USER, or SMTP_PASS).");
    return { success: false, error: "SMTP configuration missing" };
  }

  try {
    console.log("📡 Preparing to dispatch email via SMTP...");

    const transporter = createTransporter();

    const sender = process.env.SENDER_EMAIL || `"AI Resume Analyzer" <${process.env.SMTP_USER}>`;

    const mailOptions = {
      from: sender,
      to,
      subject,
      text,
      html: html || `<p>${text}</p>`,
    };

    const result = await transporter.sendMail(mailOptions);

    console.log("=================================");
    console.log("✅ EMAIL SENT SUCCESSFULLY VIA SMTP");
    console.log("📨 To:", to);
    console.log("🆔 Message ID:", result.messageId);
    console.log("=================================");

    return {
      success: true,
      provider: "smtp",
      messageId: result.messageId,
    };
  } catch (smtpError) {
    console.error("❌ SMTP sending failed:", smtpError.message);
    return {
      success: false,
      error: smtpError.message,
    };
  }
};

export default sendEmail;