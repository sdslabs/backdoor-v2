'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthInput } from '@/components/auth/auth-input';
import { loginAction } from '@/app/actions/loginActions';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginActionResponse = {
  errors?: {
    username?: string[];
    password?: string[];
    general?: string[];
  };
  success?: boolean;
};

export default function LoginTab() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parsed = loginSchema.safeParse(formData);
    if (!parsed.success) {
      const errorFields = parsed.error.flatten().fieldErrors;
      setErrors({
        username: errorFields.username?.[0],
        password: errorFields.password?.[0],
        general: undefined,
      });
      setIsSubmitting(false);
      return;
    }

    const result: LoginActionResponse = await loginAction(
      null,
      new FormData(e.target as HTMLFormElement)
    );

    if (result.errors) {
      setErrors({
        username: result.errors.username?.[0],
        password: result.errors.password?.[0],
        general: result.errors.general?.[0],
      });
    } else {
      setErrors({});
      console.log('Login successful:', result.success);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <h2 className="text-center text-lg font-semibold">Welcome Back</h2>

      <AuthInput
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        required
      />

      <AuthInput
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      {errors.general && (
        <p className="text-sm text-destructive">{errors.general}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
