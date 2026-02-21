import { API_BASE_URL, BASE_URL } from '@/lib/constants';
import axios, { AxiosInstance } from 'axios';
import { createAuthenticatedServerAxios } from './server-axios';
import { createAuthenticatedClientAxios } from './client-axios';
import { isServer } from '@tanstack/react-query';

export function getAuthAxios() {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  return axiosInstance;
}

export function getUnauthenticatedAxios() {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
  });

  return axiosInstance;
}

export async function getAuthenticatedAxios(): Promise<AxiosInstance> {
  if (isServer) {
    return await createAuthenticatedServerAxios();
  } else {
    return await createAuthenticatedClientAxios();
  }
}
