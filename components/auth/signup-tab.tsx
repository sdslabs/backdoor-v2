'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthInput } from '@/components/auth/auth-input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  handleSignupStep,
  steps,
  initialState,
} from '@/app/actions/signupActions';

export function SignupTab() {
  const [state, formAction] = useActionState(handleSignupStep, initialState);
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
            type="text"
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
            name="username"
            label="Username"
            type="text"
            error={state.errors?.username?.[0]}
            required
          />
          <AuthInput
            name="password"
            label="Password"
            type="password"
            error={state.errors?.password?.[0]}
            required
          />
          {state.errors?.general && (
            <p className="text-sm text-destructive">
              {state.errors.general[0]}
            </p>
          )}
          <Button type="submit" className="w-full">
            Finish Signup
          </Button>
        </form>
      )}

      {activeStep === steps.length && (
        <div className="text-center space-y-4">
          <h2 className="text-sm">Signup completed successfully!</h2>
          <Button onClick={resetSteps}>Reset</Button>
        </div>
      )}
    </div>
  );
}
