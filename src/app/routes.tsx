import { createBrowserRouter } from 'react-router';
import { StartPage } from '@/features/get-started/pages/StartPage';

export const router = createBrowserRouter([
  { path: '/', element: <StartPage /> },
]);
