'use client';

import React from 'react';
import { Stepper, StepperProgress, Step } from '@/components/ui/stepper';
import { UserEmail, VerifyOtp, RegisterUser } from './reset-pass-steps';

const RESET_PASS_STEPS = [
  { step: 0, Component: UserEmail },
  { step: 1, Component: VerifyOtp },
  { step: 2, Component: RegisterUser },
];

export default function ResetTab() {
  return (
    <Stepper totalSteps={RESET_PASS_STEPS.length}>
      <StepperProgress />
      {RESET_PASS_STEPS.map(({ step, Component }) => (
        <Step key={step} index={step}>
          <Component />
        </Step>
      ))}
    </Stepper>
  );
}
