'use server';

import {
  EmailSchema,
  RegisterUserSchema,
  VerifyOtpSchema,
} from '@/lib/schemas/auth';
import { z } from 'zod';
import { getAuthAxios, getUnauthenticatedAxios } from '@/lib/api/axios';
import { AxiosError } from 'axios';

interface ActionResponse {
  success: boolean;
  errors?: {
    email?: string;
    otp?: string;
    fullName?: string;
    username?: string;
    sshkey?: string;
    bhawan?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  };
  inputs?: {
    email?: string;
    otp?: string;
    fullName?: string;
    username?: string;
    sshkey?: string;
    bhawan?: string;
    password?: string;
    confirmPassword?: string;
  };
  message: string;
}

const axiosInstance = getAuthAxios();
axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';

// Server Actions for each step //
export async function handleEmailStep(
  prevState: unknown,
  formData: FormData
): Promise<ActionResponse> {
  try {
    EmailSchema.parse(convertFormDataToRecord(formData));
    console.log('Sending OTP to:', formData.get('email'));
    await axiosInstance.post('/auth/send-otp', {
      email: formData.get('email'),
    });
    return createSuccessResponse('OTP sent successfully');
  } catch (err) {
    if (err instanceof z.ZodError) {
      return handleZodError(err, formData);
    } else if (err instanceof AxiosError && err.response) {
      const { data } = err.response;
      console.log(data);
      return {
        success: false,
        message: 'Failed to send OTP',
        errors: {
          general: data.message || 'An error occurred while sending OTP',
        },
      };
    }
    return createErrorResponse('An unexpected error occurred');
  }
}

export async function handleOtpVerification(
  prevState: unknown,
  formData: FormData
): Promise<ActionResponse> {
  try {
    VerifyOtpSchema.parse(convertFormDataToRecord(formData));
    const email = formData.get('email');
    const otp = formData.get('otp');
    await axiosInstance.post('/auth/verify-otp', {
      email,
      otp,
    });
    return createSuccessResponse('OTP verified successfully');
  } catch (err) {
    if (err instanceof z.ZodError) {
      return handleZodError(err, formData);
    } else if (err instanceof AxiosError && err.response) {
      const { data } = err.response;
      return {
        success: false,
        message: 'Failed to verify OTP',
        errors: {
          general:
            data.message || 'Failed to verify OTP, please try again later.',
        },
      };
    }
    return createErrorResponse('An unexpected error occurred');
  }
}

function apiErrorMessage(data: unknown): string {
  if (data && typeof data === 'object') {
    const o = data as Record<string, unknown>;
    if (typeof o.error === 'string') return o.error;
    if (typeof o.message === 'string') return o.message;
  }
  return 'Request failed';
}

export async function handleUserRegistration(
  prevState: unknown,
  formData: FormData
): Promise<ActionResponse> {
  try {
    RegisterUserSchema.parse(convertFormDataToRecord(formData));
    const body = new URLSearchParams();
    body.set('name', String(formData.get('fullName') ?? ''));
    body.set('username', String(formData.get('username') ?? ''));
    body.set('password', String(formData.get('password') ?? ''));
    body.set('email', String(formData.get('email') ?? ''));
    body.set('ssh-key', String(formData.get('ssh-key') ?? ''));
    body.set('bhawan', String(formData.get('bhawan') ?? ''));
    await axiosInstance.post('/auth/register', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return createSuccessResponse('User registered successfully');
  } catch (err) {
    if (err instanceof z.ZodError) {
      return handleZodError(err, formData);
    } else if (err instanceof AxiosError && err.response) {
      const { data } = err.response;
      console.log(data);
      return {
        success: false,
        message: 'Failed to create user',
        errors: {
          general: apiErrorMessage(data),
        },
      };
    }
    return createErrorResponse('An unexpected error occurred');
  }
}

// Utils //
// TODO: Make a common utils for this
function convertFormDataToRecord(formData: FormData): Record<string, string> {
  const record: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') {
      record[key] = value;
    }
  }
  return record;
}

function handleZodError(err: z.ZodError, formData: FormData): ActionResponse {
  const errors: Record<string, string> = {};
  for (const issue of err.errors) {
    const key = issue.path[0] as string;
    errors[key] = issue.message;
  }
  console.log(errors);
  return {
    success: false,
    errors,
    inputs: convertFormDataToRecord(formData),
    message: 'Validation failed',
  };
}

function createErrorResponse(
  message: string,
  errors?: Record<string, string>
): ActionResponse {
  return {
    success: false,
    errors: errors || { general: 'Unexpected error' },
    message,
  };
}

function createSuccessResponse(message: string): ActionResponse {
  return {
    success: true,
    message,
  };
}
