export const steps = ['email', 'otp', 'newPassword'] as const;
export type StepKey = (typeof steps)[number];

export type FormState = {
  step: number;
  errors?: Record<string, string[]>;
  email?: string;
  resetToken?: string;
};

export const initialState: FormState = { step: 0 };
