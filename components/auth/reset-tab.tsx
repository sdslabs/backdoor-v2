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
  handleResetPasswordStep,
  steps,
  initialState,
} from '@/lib/auth/actions/reset-actions';

export default function ResetTab() {
  const [state, formAction] = useActionState(
    handleResetPasswordStep,
    initialState
  );
  const activeStep = state.errors
    ? state.step
    : Math.min(state.step, steps.length);

  const resetSteps = () => window.location.reload();

  return (
    <div className="flex flex-col items-center w-full">
      <div className="h-16 mb-6">
        <div className="flex justify-between items-center gap-12 relative">
          {steps.map((step, index) => (
            <div
              key={step}
              className="relative flex items-center justify-center"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold transition-all duration-300 ease-in-out transform ${
                  index === activeStep
                    ? 'border-primary bg-primary text-white shadow-lg scale-110'
                    : index < activeStep
                      ? 'border-primary bg-primary text-white'
                      : 'border-muted-foreground bg-transparent text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`absolute left-full top-1/2 w-12 h-1 transform -translate-y-1/2 transition-all duration-300 rounded-md ${
                    index < activeStep ? 'bg-primary' : 'bg-muted-foreground'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed height container for the form content */}
      <div className="min-h-[280px] max-w-xs w-full">
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
              error={state.errors?.confirmPassword?.[0]}
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
    </div>
  );
}
