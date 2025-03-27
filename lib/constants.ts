export const ENVIROMENT = process.env.NODE_ENV;

export const API_BASE_URL =
  ENVIROMENT === 'development'
    ? `${process.env.BACKEND_URI_DEV}/api`
    : `${process.env.BACKEND_URI_PROD}/api`;
