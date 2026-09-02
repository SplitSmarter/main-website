import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { AnalyticsPage } from '../features/analytics/pages/AnalyticsPage';
import { WorkflowPage } from '../features/workflow/pages/WorkflowPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'workflow', element: <WorkflowPage /> },
    ],
  },
]);