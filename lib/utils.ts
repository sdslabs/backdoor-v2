import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function downloadAssets(challengeName: string, asset: string) {
  return `${process.env.NEXT_PUBLIC_BACKEND_URI_DEV}/api/info/download?challenge=${challengeName}&asset=${asset}`;
}
