/* 
This is the axios instance for server side queries.
*/

'use server';

import { API_BASE_URL, SESSION_USERNAME_COOKIE } from '@/lib/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import axios from 'axios';

export async function createAuthenticatedServerAxios() {
  // In a server component, you don't have access to the browser's local storage or cookies directly.
  // So, we have to get cookies from the request headers.
  const cookiesList = await cookies();
  const token = cookiesList.get('auth')?.value;

  const serverAxios = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  serverAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
        cookiesList.delete('auth');
        cookiesList.delete(SESSION_USERNAME_COOKIE);
        redirect('/');
      }
      return Promise.reject(error);
    }
  );

  return serverAxios;
}
