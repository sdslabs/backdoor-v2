/* 
  This is the axios instance for server side queries.
*/

import { API_BASE_URL } from '@/lib/constants';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function createServerAxios() {
  const cookiesList = await cookies();
  const token = cookiesList.get('jwt')?.value;

  const serverAxios = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return serverAxios;
}
