'use server';

import { getAuthAxios, getUnauthenticatedAxios } from '@/lib/api/axios';
import { HTTPAuthorizeResp, UserRole } from '@/lib/types';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { LoginSchema } from '@/lib/schemas/auth';

interface ActionResponse {
  success: boolean;
  errors?: {
    username?: string;
    password?: string;
    general?: string;
  };
  message?: string;
  token?: string;
  role?: UserRole;
}

export async function loginAction(
  _: unknown,
  formData: FormData
): Promise<ActionResponse> {
  const values = Object.fromEntries(formData.entries());
  const parsed = LoginSchema.safeParse(values);

  if (!parsed.success) {
    const { username: usernameError, password: passwordError } =
      parsed.error.flatten().fieldErrors;
    return {
      success: false,
      // TODO: handle this a better way
      errors: {
        username: usernameError ? usernameError[0] : '',
        password: passwordError ? passwordError[0] : '',
      },
    };
  }

  const { username, password } = parsed.data;
  const axiosInstance = getAuthAxios();
  axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';

  try {
    const response = await axiosInstance.post<HTTPAuthorizeResp>(
      '/auth/login',
      {
        username,
        password,
      }
    );

    const { token, message, role } = response.data;
    const cookieStore = await cookies();
    cookieStore.set('auth', token);

    return { success: true, message, role: role as UserRole };
  } catch (error) {
    console.error('Login error:', error);

    if (error instanceof AxiosError && error.response) {
      const { data } = error.response;
      return {
        success: false,
        errors: {
          general:
            data.message ||
            'Login failed. Check your credentials, or try again later.',
        },
      };
    }

    return {
      success: false,
      errors: {
        general: 'An unexpected error occurred',
      },
    };
  }
}
