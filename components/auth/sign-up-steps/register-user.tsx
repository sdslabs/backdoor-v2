import { AuthInput } from '@/components/ui/auth-input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useStepper } from '@/components/ui/stepper';
import { handleUserRegistration } from '@/lib/api/auth/sign-up';
import { useEmailStore } from '@/lib/stores/email-store';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

const RegisterUser = () => {
  const [state, formAction, isPending] = useActionState(
    handleUserRegistration,
    null
  );
  const stepper = useStepper();
  const { email } = useEmailStore();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      stepper.nextStep();
    }
  }, [state, stepper]);

  return stepper.hasCompletedAllSteps ? (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold">Registration Complete</h2>
      <p className="text-sm text-muted-foreground">
        You can now log in with your credentials :)
      </p>
    </div>
  ) : (
    <form action={formAction} className="space-y-4 mx-auto">
      <AuthInput
        name="fullName"
        label="Full Name"
        type="text"
        error={state?.errors?.fullName}
        defaultValue={state?.inputs?.fullName}
        required
      />
      <input type="hidden" name="email" value={email} />
      <AuthInput
        name="username"
        label="Username"
        type="text"
        error={state?.errors?.username}
        defaultValue={state?.inputs?.username}
        required
      />
      <AuthInput
        name="password"
        label="Password"
        type="password"
        error={state?.errors?.password}
        defaultValue={state?.inputs?.password}
        required
      />
      <AuthInput
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        error={state?.errors?.confirmPassword}
        defaultValue={state?.inputs?.confirmPassword}
        required
      />
      {state?.errors?.general && (
        <p className="text-sm text-destructive">{state.errors.general}</p>
      )}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <Spinner className="size-4" /> : 'Finish Signup'}
      </Button>
    </form>
  );
};

export { RegisterUser };
