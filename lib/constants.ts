export const ENVIROMENT = process.env.NODE_ENV;

export const BASE_URL =
  ENVIROMENT === 'development'
    ? `${process.env.NEXT_PUBLIC_BACKEND_URI_DEV}`
    : `${process.env.NEXT_PUBLIC_BACKEND_URI_PROD}`;

export const API_BASE_URL =
  ENVIROMENT === 'development'
    ? `${process.env.NEXT_PUBLIC_BACKEND_URI_DEV}/api`
    : `${process.env.NEXT_PUBLIC_BACKEND_URI_PROD}/api`;

/** Set on login; read server-side in `getCurrentUser`. */
export const SESSION_USERNAME_COOKIE = 'username';

export const LEADERBOARD_TABLE_PAGE_LIMIT = 10;

/** Display label for each code; keep in sync with beast/core/bhawan.go AllHostels */
export const BHAWAN_LABELS = {
  AB: 'Azad Bhawan',
  CB: 'Cautley Bhawan',
  GB: 'Ganga Bhawan',
  GOB: 'Govind Bhawan',
  JWB: 'Jawahar Bhawan',
  RB: 'Rajendra Bhawan',
  RKB: 'Radhakrishnan Bhawan',
  RJB: 'Rajiv Bhawan',
  RVB: 'Ravindra Bhawan',
  MB: 'Malviya Bhawan',
  HMB: 'Himalaya Bhawan',
  INB: 'Indira Bhawan',
  KB: 'Kasturba Bhawan',
  SB: 'Sarojini Bhawan',
  GPH: 'G.P. Hostel',
  MRC: 'M.R. Chopra',
  AZW: 'Azad Wing',
  DSB: 'D.S. Barrack',
  ANK: 'A.N. Khosla House',
  KIH: 'K.I.H.',
  VVK: 'Vivekananda Bhawan',
  VK: 'Vigyan Bhawan',
} as const;

/** Allowed bhawan codes; keep in sync with beast/core/bhawan.go ValidBhawans */
export const BHAWAN_OPTIONS = [
  'AB',
  'CB',
  'GB',
  'GOB',
  'JWB',
  'RB',
  'RKB',
  'RJB',
  'RVB',
  'MB',
  'HMB',
  'INB',
  'KB',
  'SB',
  'GPH',
  'MRC',
  'AZW',
  'DSB',
  'ANK',
  'KIH',
  'VVK',
  'VK',
] as const satisfies readonly (keyof typeof BHAWAN_LABELS)[];

export type BhawanCode = (typeof BHAWAN_OPTIONS)[number];
export const USERS_TABLE_PAGE_LIMIT = 15;
export const SUBMISSIONS_TABLE_PAGE_LIMIT = 15;
export const CHALLENGE_SUBMISSIONS_TABLE_PAGE_LIMIT = 10;
