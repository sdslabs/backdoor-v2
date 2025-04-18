'use client';

import React from 'react';
import { Stepper, StepperProgress, Step } from '@/components/ui/stepper';
import { UserEmail, VerifyOtp, RegisterUser } from './sign-up-steps';

const SIGNUP_STEPS = [
  { step: 0, Component: UserEmail },
  { step: 1, Component: VerifyOtp },
  { step: 2, Component: RegisterUser },
];

export default function SignupTab() {
  return (
    <Stepper totalSteps={SIGNUP_STEPS.length}>
      <StepperProgress />
      {SIGNUP_STEPS.map(({ step, Component }) => (
        <Step key={step} index={step}>
          <Component />
        </Step>
      ))}
    </Stepper>
  );
}
