'use client';

import { useActionState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AuthInput } from '@/components/auth/auth-input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const emailSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be 6 digits' }),
});

const newPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const steps = ['email', 'otp', 'newPassword'] as const;
type StepKey = (typeof steps)[number];

type FormState = {
  step: number;
  errors?: Record<string, string[]>;
};

const initialState: FormState = { step: 0 };

async function handleResetPasswordStep(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const step = prevState.step;
  const formObj = Object.fromEntries(formData.entries());

  try {
    if (step === 0) {
      emailSchema.parse(formObj);
      // Simulate sending OTP
      return { step: step + 1 };
    } else if (step === 1) {
      otpSchema.parse(formObj);
      // Simulate verifying OTP
      return { step: step + 1 };
    } else if (step === 2) {
      newPasswordSchema.parse(formObj);
      // Simulate updating the password
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
      return { step, errors }; // don't advance
    }
    return { step, errors: { general: ['Unexpected error'] } };
  }

  return { step };
}

export function ResetTab() {
  const [state, formAction] = useActionState(
    handleResetPasswordStep,
    initialState
  );
  const activeStep = state.errors
    ? state.step
    : Math.min(state.step, steps.length);
  const resetSteps = () => window.location.reload();

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4 mb-6">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              index === activeStep
                ? 'border-primary text-primary'
                : 'border-muted-foreground'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {activeStep === 0 && (
        <form action={formAction} className="space-y-4">
          <AuthInput
            name="email"
            label="Email"
            type="email"
            error={state.errors?.email?.[0]}
            required
          />
          {state.errors?.general && (
            <p className="text-sm text-destructive">
              {state.errors.general[0]}
            </p>
          )}
          <Button type="submit" className="w-full">
            Send OTP
          </Button>
        </form>
      )}

      {activeStep === 1 && (
        <form
          action={formAction}
          className="space-y-4 flex flex-col items-center"
        >
          <InputOTP maxLength={6} name="otp">
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {state.errors?.otp && (
            <p className="text-sm text-destructive mt-2">
              {state.errors.otp[0]}
            </p>
          )}
          {state.errors?.general && (
            <p className="text-sm text-destructive">
              {state.errors.general[0]}
            </p>
          )}
          <Button type="submit" className="w-full">
            Verify OTP
          </Button>
        </form>
      )}

      {activeStep === 2 && (
        <form action={formAction} className="space-y-4">
          <AuthInput
            name="newPassword"
            label="New Password"
            type="password"
            error={state.errors?.newPassword?.[0]}
            required
          />
          <AuthInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            error={state.errors?.newPassword?.[0]}
            required
          />
          {state.errors?.general && (
            <p className="text-sm text-destructive">
              {state.errors.general[0]}
            </p>
          )}
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      )}

      {activeStep === steps.length && (
        <div className="text-center space-y-4">
          <h2 className="text-sm">Password reset successfully!</h2>
          <Button onClick={resetSteps}>Reset</Button>
        </div>
      )}
    </div>
  );
}
