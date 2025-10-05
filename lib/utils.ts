import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getUnauthenticatedAxios } from './api/axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
