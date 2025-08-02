import nodemailer from "nodemailer";
interface MailOptions {
  activationUrl?: string;
  activationCode?: string;
  name?: string;
  email: string;
  subject: string;
  message?: string;
  data?: { [key: string]: any };
  type?: "activation" | "question-reply" | "order-confirmation" | "general";
}

const sendMail = async (options: MailOptions) => {
  const isActivation = !!(
    options.activationUrl ||
    options.activationCode ||
    options.data?.activationCode
  );
  const activationCode = options.activationCode || options.data?.activationCode;
  const emailType = options.type || (isActivation ? "activation" : "general");

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    service: process.env.SMTP_SERVICE,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mainColor = "#1e293b"; // dark slate (bg-slate-800)
  const cardBg = "#fff"; // white card
  const cardShadow = "0 4px 16px rgba(30,41,59,0.10)"; // shadow-md
  const borderRadius = "16px"; // rounded-lg
  const accentColor = "#2563eb"; // blue-600
  const mutedColor = "#64748b"; // slate-500
  const borderColor = "#e2e8f0"; // slate-200
  const successColor = "#10b981"; // green-600
  const fontFamily =
    "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

  let html = "";

  // Account Activation Email with Code
  if (emailType === "activation" && activationCode) {
    html = `
      <div style="background: #f1f5f9; padding: 40px 0; font-family: ${fontFamily};">
        <div style="max-width: 600px; margin: auto; background: ${cardBg}; border-radius: ${borderRadius}; box-shadow: ${cardShadow}; border: 1px solid ${borderColor}; overflow: hidden;">
          <div style="background: linear-gradient(135deg, ${mainColor} 0%, ${accentColor} 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
              📚 Learneazy LMS
            </h1>
            <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px;">
              Learning Management System
            </p>
          </div>
          <div style="padding: 40px 32px;">
            <h2 style="color: ${mainColor}; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">
              Activate Your Account
            </h2>
            <p style="color: ${mutedColor}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
              Hello <strong style="color: ${mainColor};">${
      options.name || "there"
    }</strong>,
            </p>
            <p style="color: ${mutedColor}; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
              Welcome to Learneazy LMS! To complete your registration and start your learning journey, please use the activation code below:
            </p>
            <div style="background: #f8fafc; border: 2px dashed ${accentColor}; border-radius: 12px; padding: 24px; text-align: center; margin: 32px 0;">
              <p style="color: ${mutedColor}; font-size: 14px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                Your Activation Code
              </p>
              <div style="background: #fff; border: 2px solid ${accentColor}; border-radius: 8px; padding: 16px; display: inline-block;">
                <span style="font-size: 32px; font-weight: 700; color: ${mainColor}; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                  ${activationCode}
                </span>
              </div>
              <p style="color: ${mutedColor}; font-size: 14px; margin: 12px 0 0 0;">
                This code expires in <strong>5 minutes</strong>
              </p>
            </div>
            <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 6px; margin: 24px 0;">
              <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 500;">
                ⚠️ <strong>Security Notice:</strong> If you didn't create an account with Learneazy LMS, please ignore this email. This activation code will expire automatically.
              </p>
            </div>
            <p style="color: ${mutedColor}; font-size: 14px; line-height: 1.5; margin: 24px 0 0 0;">
              Having trouble? Contact our support team at
              <a href="mailto:support@learneazy.com" style="color: ${accentColor}; text-decoration: none;">support@learneazy.com</a>
            </p>
          </div>
          <div style="background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid ${borderColor};">
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
  }
  // Account Activation Email with URL
  else if (emailType === "activation" && options.activationUrl) {
    html = `
      <div style="background: #f1f5f9; padding: 40px 0; font-family: ${fontFamily};">
        <div style="max-width: 600px; margin: auto; background: ${cardBg}; border-radius: ${borderRadius}; box-shadow: ${cardShadow}; border: 1px solid ${borderColor}; overflow: hidden;">
          <div style="background: linear-gradient(135deg, ${mainColor} 0%, ${accentColor} 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 28px; font-weight: 700;">📚 Learneazy LMS</h1>
          </div>
          <div style="padding: 40px 32px;">
            <h2 style="color: ${mainColor}; margin: 0 0 16px 0;">Activate Your Account</h2>
            <p style="color: ${mutedColor}; font-size: 16px;">Hello <strong>${
      options.name || "there"
    }</strong>,</p>
            <p style="color: ${mutedColor}; font-size: 16px;">Welcome to Learneazy LMS! Click the button below to activate your account and start learning.</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${options.activationUrl}"
                style="background: ${accentColor}; color: #fff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
                Activate Account
              </a>
            </div>
          </div>
          <div style="background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid ${borderColor};">
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
  }
  // Question Reply Email
  else if (emailType === "question-reply" && options.data) {
    const { name, title, answer, questionText, instructorName } = options.data;
    html = `
      <div style="background: #f1f5f9; padding: 40px 0; font-family: ${fontFamily};">
        <div style="max-width: 600px; margin: auto; background: ${cardBg}; border-radius: ${borderRadius}; box-shadow: ${cardShadow}; border: 1px solid ${borderColor}; overflow: hidden;">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, ${successColor} 0%, ${accentColor} 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
              📚 Learneazy LMS
            </h1>
            <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px;">
              Course Q&A Notification
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 32px;">
            <div style="background: #f0f9ff; border-left: 4px solid ${accentColor}; padding: 16px; border-radius: 6px; margin: 0 0 24px 0;">
              <h2 style="color: ${mainColor}; margin: 0 0 8px 0; font-size: 22px; font-weight: 600;">
                💬 Your Question Has Been Answered!
              </h2>
              <p style="color: #0369a1; font-size: 14px; margin: 0; font-weight: 500;">
                Course: ${title}
              </p>
            </div>

            <p style="color: ${mutedColor}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
              Hello <strong style="color: ${mainColor};">${name}</strong>,
            </p>

            <p style="color: ${mutedColor}; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Great news! Your question in the course "<strong>${title}</strong>" has received a new answer.
            </p>

            <!-- Question Box -->
            <div style="background: #f8fafc; border: 1px solid ${borderColor}; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <h3 style="color: ${mainColor}; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">
                📝 Your Question:
              </h3>
              <p style="color: #475569; font-size: 15px; line-height: 1.6; margin: 0; font-style: italic;">
                "${questionText || "Your question about the course content"}"
              </p>
            </div>

            <!-- Answer Box -->
            <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <h3 style="color: ${mainColor}; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">
                💡 Answer from ${instructorName || "Instructor"}:
              </h3>
              <p style="color: #0f172a; font-size: 15px; line-height: 1.6; margin: 0;">
                ${
                  answer ||
                  "Please check your course dashboard for the complete answer."
                }
              </p>
            </div>

            <!-- Call to Action -->
            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 32px 0; text-align: center;">
              <p style="color: ${mutedColor}; font-size: 14px; margin: 0 0 16px 0;">
                Continue the conversation or view more details
              </p>
              <a href="${process.env.FRONTEND_URL}/course/${
      options.data.courseId
    }"
                style="background: ${successColor}; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
                View Course Discussion
              </a>
            </div>

            <div style="background: #ecfdf5; border-left: 4px solid ${successColor}; padding: 16px; border-radius: 6px; margin: 24px 0;">
              <p style="color: #065f46; font-size: 14px; margin: 0; font-weight: 500;">
                💡 <strong>Tip:</strong> Keep engaging with your course content and don't hesitate to ask more questions. Learning is a journey!
              </p>
            </div>

            <p style="color: ${mutedColor}; font-size: 14px; line-height: 1.5; margin: 24px 0 0 0;">
              Need help? Contact our support team at
              <a href="mailto:support@learneazy.com" style="color: ${accentColor}; text-decoration: none;">support@learneazy.com</a>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid ${borderColor};">
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
  }
  // Order Confirmation Email
  else if (emailType === "order-confirmation" && options.data) {
    const { userName, courseName, orderNumber, amount, date } = options.data;
    html = `
      <div style="background: #f1f5f9; padding: 40px 0; font-family: ${fontFamily};">
        <div style="max-width: 600px; margin: auto; background: ${cardBg}; border-radius: ${borderRadius}; box-shadow: ${cardShadow}; border: 1px solid ${borderColor}; overflow: hidden;">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, ${successColor} 0%, ${accentColor} 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
              📚 Learneazy LMS
            </h1>
            <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px;">
              Order Confirmation
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 32px;">
            <div style="background: #ecfdf5; border-left: 4px solid ${successColor}; padding: 16px; border-radius: 6px; margin: 0 0 24px 0;">
              <h2 style="color: ${mainColor}; margin: 0 0 8px 0; font-size: 22px; font-weight: 600;">
                🎉 Order Confirmed Successfully!
              </h2>
              <p style="color: #065f46; font-size: 14px; margin: 0; font-weight: 500;">
                Thank you for your purchase!
              </p>
            </div>

            <p style="color: ${mutedColor}; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
              Hello <strong style="color: ${mainColor};">${userName}</strong>,
            </p>

            <p style="color: ${mutedColor}; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
              Your order has been confirmed and you now have access to your course. Start learning immediately!
            </p>

            <!-- Order Details Box -->
            <div style="background: #f8fafc; border: 1px solid ${borderColor}; border-radius: 8px; padding: 24px; margin: 24px 0;">
              <h3 style="color: ${mainColor}; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">
                📋 Order Details
              </h3>

              <div style="margin: 12px 0;">
                <span style="color: #64748b; font-size: 14px;">Order Number:</span>
                <span style="color: ${mainColor}; font-weight: 600; margin-left: 8px;">#${orderNumber}</span>
              </div>

              <div style="margin: 12px 0;">
                <span style="color: #64748b; font-size: 14px;">Course:</span>
                <span style="color: ${mainColor}; font-weight: 600; margin-left: 8px;">${courseName}</span>
              </div>

              <div style="margin: 12px 0;">
                <span style="color: #64748b; font-size: 14px;">Amount:</span>
                <span style="color: ${successColor}; font-weight: 700; margin-left: 8px; font-size: 16px;">$${amount}</span>
              </div>

              <div style="margin: 12px 0;">
                <span style="color: #64748b; font-size: 14px;">Date:</span>
                <span style="color: ${mainColor}; font-weight: 600; margin-left: 8px;">${date}</span>
              </div>
            </div>

            <!-- Course Access Box -->
            <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <h3 style="color: ${mainColor}; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">
                🚀 Ready to Start Learning?
              </h3>
              <p style="color: #0f172a; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                Your course is now available in your dashboard. Access all course materials, videos, and resources instantly.
              </p>
            </div>

            <!-- Call to Action -->
            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 32px 0; text-align: center;">
              <p style="color: ${mutedColor}; font-size: 14px; margin: 0 0 16px 0;">
                Start your learning journey now
              </p>
              <a href="${process.env.FRONTEND_URL}/course/${
      options.data.courseId
    }"
                style="background: ${successColor}; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;">
                Access Course
              </a>
            </div>

            <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 6px; margin: 24px 0;">
              <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 500;">
                💡 <strong>Pro Tip:</strong> Don't forget to check out the course materials and join the discussion forum to interact with other students!
              </p>
            </div>

            <p style="color: ${mutedColor}; font-size: 14px; line-height: 1.5; margin: 24px 0 0 0;">
              Need help? Contact our support team at
              <a href="mailto:support@learneazy.com" style="color: ${accentColor}; text-decoration: none;">support@learneazy.com</a>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid ${borderColor};">
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
  }
  // General Email Template
  else {
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

  // Generate appropriate text content based on email type
  let textContent = "";
  if (emailType === "activation" && activationCode) {
    textContent = `Hello ${
      options.name || "there"
    },\n\nYour activation code is: ${activationCode}\n\nThis code expires in 5 minutes.\n\nBest regards,\nLearneazy LMS Team`;
  } else if (emailType === "question-reply" && options.data) {
    textContent = `Hello ${
      options.data.name
    },\n\nYour question in the course "${
      options.data.title
    }" has been answered.\n\nQuestion: ${
      options.data.questionText || "Your question"
    }\nAnswer: ${
      options.data.answer || "Please check your course dashboard"
    }\n\nBest regards,\nLearneazy LMS Team`;
  } else if (emailType === "order-confirmation" && options.data) {
    textContent = `Hello ${options.data.userName},\n\nYour order has been confirmed!\n\nOrder Details:\nOrder Number: #${options.data.orderNumber}\nCourse: ${options.data.courseName}\nAmount: $${options.data.amount}\nDate: ${options.data.date}\n\nYou can now access your course in your dashboard.\n\nBest regards,\nLearneazy LMS Team`;
  } else {
    textContent = options.message || "Thank you for using Learneazy LMS!";
  }

  const mailOptions = {
    from: `"Learneazy LMS" <${process.env.SMTP_MAIL}>`,
    to: options.email,
    subject: options.subject,
    text: textContent,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
