export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
