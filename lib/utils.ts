import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getUnauthenticatedAxios } from './api/axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function downloadAssets(challengeName: string, asset: string) {
  const axios = getUnauthenticatedAxios();
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI_DEV}/api/info/download?challenge=${challengeName}&asset=${asset}`;
  const response = await axios({
    url: url,
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', asset);
    document.body.appendChild(link);
    link.click();
  });
}
