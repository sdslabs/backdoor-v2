'use client';

import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AuthInput } from '@/components/ui/auth-input';
import { loginAction } from '@/lib/api/auth/login';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Spinner } from '@/components/ui/spinner';

export default function LoginTab() {
  const [loginState, action, isPending] = useActionState(loginAction, null);
  const { setIsLoggedIn, setRole } = useAuthStore();

  useEffect(() => {
    if (loginState?.success) {
      toast.success('Login successful!');
      setIsLoggedIn(true);
      setRole(loginState.role);
      redirect('/dashboard');
    }
  }, [loginState, setIsLoggedIn, setRole]);

  return (
    <form action={action} className="space-y-4 w-full">
      <AuthInput
        name="username"
        label="Username"
        error={loginState?.errors?.username}
        required
      />
      <AuthInput
        name="password"
        label="Password"
        type="password"
        error={loginState?.errors?.password}
        required
      />
      {loginState?.errors?.general && (
        <p className="text-sm text-destructive">
          {loginState?.errors?.general}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? <Spinner className="size-4" /> : 'Login'}
      </Button>
    </form>
  );
}
