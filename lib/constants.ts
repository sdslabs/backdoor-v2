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
export const USERS_TABLE_PAGE_LIMIT = 15;
export const SUBMISSIONS_TABLE_PAGE_LIMIT = 15;
export const CHALLENGE_SUBMISSIONS_TABLE_PAGE_LIMIT = 10;
