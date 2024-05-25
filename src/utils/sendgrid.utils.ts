import * as sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.SENDGRID_API_KEY! as string;

sgMail.setApiKey(apiKey);
import { generateEmailTemplate } from './email-template.utils';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendVerificationEmail = async (receiver: string, link: string) => {
  const msg = {
    to: receiver,
    from: process.env.SENDGRID_VERIFIED_SENDER,
    subject: 'Verify Your Email',
    html: generateEmailTemplate(link),
  };

  await sgMail.send(msg);
};

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
) => {
  const resetLink = `${process.env.FRONTEND_APP_URL}/login?token=${resetToken}`;

  const msg = {
    to: email,
    from: process.env.SENDGRID_VERIFIED_SENDER,
    subject: 'Password Reset',
    text: `You requested a password reset. Please go to the following link to reset your password: ${resetLink}`,
    // html: `<p>You requested a password reset. Please click <a href="${resetLink}">here</a>, or use your token: ${resetToken} to reset your password.</p>`,
    html: generateEmailTemplate(resetLink, 'resetPass', resetToken),
  };

  await sgMail.send(msg);
};
