'use client';

import { AuthInput } from '@/components/ui/auth-input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useStepper } from '@/components/ui/stepper';
import { handleEmailStep } from '@/lib/api/auth/sign-up';
import { useEmailStore } from '@/lib/stores/email-store';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

const UserEmail = () => {
  const stepper = useStepper();
  const [state, formAction, isPending] = useActionState(handleEmailStep, null);
  const { setEmail } = useEmailStore();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      stepper.nextStep();
    }
  }, [state, stepper]);

  return (
    <form action={formAction} className="space-y-4 mx-auto">
      <AuthInput
        name="email"
        label="Email"
        type="text"
        placeholder="Enter your email"
        error={state?.errors?.email}
        defaultValue={state?.inputs?.email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      {state?.errors?.general && (
        <p className="text-sm text-destructive">{state.errors.general}</p>
      )}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <Spinner className="size-4" /> : 'Send OTP'}
      </Button>
    </form>
  );
};

export { UserEmail };
