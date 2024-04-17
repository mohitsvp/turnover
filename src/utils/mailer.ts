import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Example using Gmail
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `"Your App" <noreply@yourdomain.com>`,
    to: email,
    subject: 'Verify Your Email',
    html: `
    <p>Please use the following One-Time Password (OTP) to verify your email:</p>
    <p><b>${otp}</b></p>
  `,
  });
};
