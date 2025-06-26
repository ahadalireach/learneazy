import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

interface MailOptions {
  activationUrl?: string;
  activationCode?: string;
  name?: string;
  email: string;
  subject: string;
  message?: string;
  data?: { [key: string]: any };
}

const sendMail = async (options: MailOptions) => {
  const isActivation = !!(
    options.activationUrl ||
    options.activationCode ||
    options.data?.activationCode
  );
  const activationCode = options.activationCode || options.data?.activationCode;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    service: process.env.SMTP_SERVICE,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mainColor = "#374151";
  const buttonColor = "#1f2937";
  const accentColor = "#3b82f6";

  let html = "";

  if (isActivation && activationCode) {
    // Activation code email template
    html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; padding: 40px 0; margin: 0;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, ${mainColor} 0%, ${accentColor} 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
              📚 Learneazy LMS
            </h1>
            <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px;">
              Learning Management System
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 32px;">
            <h2 style="color: ${mainColor}; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">
              Activate Your Account
            </h2>

            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
              Hello <strong style="color: ${mainColor};">${
      options.name || "there"
    }</strong>,
            </p>

            <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              Welcome to Learneazy LMS! To complete your registration and start your learning journey, please use the activation code below:
            </p>

            <!-- Activation Code Box -->
            <div style="background: #f1f5f9; border: 2px dashed ${accentColor}; border-radius: 12px; padding: 24px; text-align: center; margin: 32px 0;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                Your Activation Code
              </p>
              <div style="background: #ffffff; border: 2px solid ${accentColor}; border-radius: 8px; padding: 16px; display: inline-block;">
                <span style="font-size: 32px; font-weight: 700; color: ${mainColor}; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                  ${activationCode}
                </span>
              </div>
              <p style="color: #64748b; font-size: 14px; margin: 12px 0 0 0;">
                This code expires in <strong>5 minutes</strong>
              </p>
            </div>

            <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 6px; margin: 24px 0;">
              <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 500;">
                ⚠️ <strong>Security Notice:</strong> If you didn't create an account with Learneazy LMS, please ignore this email. This activation code will expire automatically.
              </p>
            </div>

            <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 24px 0 0 0;">
              Having trouble? Contact our support team at
              <a href="mailto:support@learneazy.com" style="color: ${accentColor}; text-decoration: none;">support@learneazy.com</a>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 14px; margin: 0 0 8px 0;">
              &copy; ${new Date().getFullYear()} Learneazy LMS. All rights reserved.
            </p>
            <p style="color: #cbd5e1; font-size: 12px; margin: 0;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>

        </div>
      </div>
    `;
  } else if (isActivation && options.activationUrl) {
    // Activation URL email template
    html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; padding: 40px 0;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="background: linear-gradient(135deg, ${mainColor} 0%, ${accentColor} 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">📚 Learneazy LMS</h1>
          </div>
          <div style="padding: 40px 32px;">
            <h2 style="color: ${mainColor}; margin: 0 0 16px 0;">Activate Your Account</h2>
            <p>Hello <strong>${options.name || "there"}</strong>,</p>
            <p>Welcome to Learneazy LMS! Click the button below to activate your account and start learning.</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${options.activationUrl}"
                style="background: ${buttonColor}; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                Activate Account
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    // General message template
    html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; padding: 40px 0;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="background: linear-gradient(135deg, ${mainColor} 0%, ${accentColor} 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">📚 Learneazy LMS</h1>
          </div>
          <div style="padding: 40px 32px;">
            <p style="color: #64748b; font-size: 16px; line-height: 1.6;">${
              options.message
            }</p>
          </div>
          <div style="background: #f8fafc; padding: 24px 32px; text-align: center;">
            <p style="color: #94a3b8; font-size: 14px; margin: 0;">
              &copy; ${new Date().getFullYear()} Learneazy LMS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  const mailOptions = {
    from: `"Learneazy LMS" <${process.env.SMTP_MAIL}>`,
    to: options.email,
    subject: options.subject,
    text: `Hello ${
      options.name || "there"
    },\n\nYour activation code is: ${activationCode}\n\nThis code expires in 5 minutes.\n\nBest regards,\nLearneazy LMS Team`,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
