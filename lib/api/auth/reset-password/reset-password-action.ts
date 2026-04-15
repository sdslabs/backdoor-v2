'use server';

import { z } from 'zod';
import { AxiosError } from 'axios';
import { EmailSchema, NewPasswordSchema, OtpSchema } from '@/lib/schemas/auth';
import { getAuthAxios } from '@/lib/api/axios';
import type { FormState } from './reset-password-state';

const axiosInstance = getAuthAxios();
axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';

function apiErrorMessage(data: unknown): string {
  if (data && typeof data === 'object') {
    const o = data as Record<string, unknown>;
    if (typeof o.error === 'string') return o.error;
    if (typeof o.message === 'string') return o.message;
  }
  return 'Request failed';
}

export async function handleResetPasswordStep(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const step = prevState.step;
  const formObj = Object.fromEntries(formData.entries());

  try {
    if (step === 0) {
      EmailSchema.parse(formObj);
      const email = String(formData.get('email') ?? '')
        .trim()
        .toLowerCase();
      await axiosInstance.post('/auth/send-otp-forget', { email });
      return { step: step + 1, email };
    }

    if (step === 1) {
      OtpSchema.parse(formObj);
      const email = prevState.email;
      if (!email) {
        return {
          step: 0,
          errors: {
            general: ['Session expired. Please start again from email.'],
          },
        };
      }
      const otp = String(formData.get('otp') ?? '').trim();
      const { data } = await axiosInstance.post<{ token: string }>(
        '/auth/verify-otp-forget',
        { email, otp }
      );
      return {
        step: step + 1,
        email,
        resetToken: data.token,
      };
    }

    if (step === 2) {
      NewPasswordSchema.parse(formObj);
      const token = prevState.resetToken;
      if (!token) {
        return {
          step: 0,
          errors: {
            general: ['Session expired. Please start again from email.'],
          },
        };
      }
      const newPass = String(formData.get('newPassword') ?? '');
      const body = new URLSearchParams();
      body.set('new_pass', newPass);
      await axiosInstance.post('/auth/reset-password', body.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      });
      return { step: step + 1, email: prevState.email };
    }
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      for (const issue of err.errors) {
        const key = issue.path[0] as string;
        if (!errors[key]) errors[key] = [];
        errors[key].push(issue.message);
      }
      return {
        step,
        errors,
        email: prevState.email,
        resetToken: prevState.resetToken,
      };
    }
    if (err instanceof AxiosError && err.response) {
      const msg = apiErrorMessage(err.response.data);
      return {
        step,
        errors: { general: [msg] },
        email: prevState.email,
        resetToken: prevState.resetToken,
      };
    }
    return {
      step,
      errors: { general: ['Unexpected error'] },
      email: prevState.email,
      resetToken: prevState.resetToken,
    };
  }

  return { step, email: prevState.email, resetToken: prevState.resetToken };
}
