import { BHAWAN_OPTIONS } from '@/lib/constants';
import { z } from 'zod';

const IITR_EMAIL_HOST = 'iitr.ac.in';

/** IITR webmail: @iitr.ac.in or a department subdomain (e.g. @ece.iitr.ac.in). */
export function isIitrAcInEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const at = normalized.lastIndexOf('@');
  if (at <= 0 || at === normalized.length - 1) return false;
  const host = normalized.slice(at + 1);
  return host === IITR_EMAIL_HOST || host.endsWith(`.${IITR_EMAIL_HOST}`);
}

const iitrEmailString = z
  .string()
  .email({ message: 'Invalid email address' })
  .refine(isIitrAcInEmail, {
    message: `Use an IITR email address (@${IITR_EMAIL_HOST} or @*.${IITR_EMAIL_HOST})`,
  });

export const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const EmailSchema = z.object({
  email: iitrEmailString,
});

export const OtpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be 6 digits' }),
});

export const VerifyOtpSchema = z.object({
  email: iitrEmailString,
  otp: z.string().length(6, { message: 'OTP must be 6 digits' }),
});

export const NewPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const RegisterUserSchema = z
  .object({
    fullName: z.string().min(3, { message: 'Full name too short' }),
    username: z.string().min(3, { message: 'Username too short' }),
    email: iitrEmailString,
    bhawan: z.enum(BHAWAN_OPTIONS, { message: 'Select a valid bhawan' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const BackgroundNotificationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  desc: z.string().min(1, 'Description is required'),
});
