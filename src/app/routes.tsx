import { createBrowserRouter } from 'react-router';
import { WorkflowPage } from '@/features/dashboard/pages/WorkflowPage';
import { HomePage } from '@/features/home/pages/HomePage';
import { StartPage } from '@/features/get-started/pages/StartPage';
import { SpatialPreviewPage } from '@/features/spatial-preview/pages/SpatialPreviewPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/dev/spatial', element: <SpatialPreviewPage /> },
  { path: '/dev/start', element: <StartPage /> },
  { path: '/dev/workflow', element: <WorkflowPage /> },
]);
