import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Example using Gmail
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `https://yourdomain.com/api/verify?token=${token}`;
  await transporter.sendMail({
    from: `"Your App" <noreply@yourdomain.com>`,
    to: email,
    subject: 'Verify Your Email',
    html: `Please click on the link to verify your email: <a href="${verificationUrl}">Verify Email</a>`,
  });
};
