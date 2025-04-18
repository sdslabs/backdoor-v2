import { z } from 'zod';
import { EmailSchema, OtpSchema, NewPasswordSchema } from '@/lib/schemas/auth';
export const steps = ['email', 'otp', 'newPassword'] as const;
export type StepKey = (typeof steps)[number];

export type FormState = {
  step: number;
  errors?: Record<string, string[]>;
};

export const initialState: FormState = { step: 0 };

const EXPECTED_OTP = '123456';

// TODO: Implement the logic just like sign-up step
export async function handleResetPasswordStep(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const step = prevState.step;
  const formObj = Object.fromEntries(formData.entries());

  try {
    if (step === 0) {
      EmailSchema.parse(formObj);
      console.log('Sending OTP to:', formObj.email);
      return { step: step + 1 };
    }

    if (step === 1) {
      OtpSchema.parse(formObj);
      const otp = formObj.otp;
      if (otp !== EXPECTED_OTP) {
        return {
          step,
          errors: { otp: ['Incorrect OTP entered'] },
        };
      }
      return { step: step + 1 };
    }

    if (step === 2) {
      NewPasswordSchema.parse(formObj);
      console.log('Resetting password');
      return { step: step + 1 };
    }
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      for (const issue of err.errors) {
        const key = issue.path[0] as string;
        if (!errors[key]) errors[key] = [];
        errors[key].push(issue.message);
      }
      return { step, errors };
    }
    return { step, errors: { general: ['Unexpected error'] } };
  }

  return { step };
}
