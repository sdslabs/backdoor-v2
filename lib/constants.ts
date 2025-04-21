export const ENVIROMENT = process.env.NODE_ENV;

export const API_BASE_URL =
  ENVIROMENT === 'development'
    ? `${process.env.NEXT_PUBLIC_BACKEND_URI_DEV}`
    : `${process.env.NEXT_PUBLIC_BACKEND_URI_PROD}`;

export const LEADERBOARD_TABLE_PAGE_LIMIT = 10;
