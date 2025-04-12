/* 
  This is the axios instance for client side queries.
*/

import Cookies from 'js-cookie';
import { API_BASE_URL } from '@/lib/constants';
import axios from 'axios';

export default function createClientAxios() {
  const clientAxios = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    withCredentials: true,
  });

  clientAxios.interceptors.request.use((config) => {
    const { jwtToken } = Cookies.get();
    config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
  });

  return clientAxios;
}
