export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://0.0.0.0:3000',
  guideUrl: import.meta.env.VITE_GUIDE_URL || '',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
