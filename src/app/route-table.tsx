import type { RouteObject } from 'react-router';
import { articles } from '@/content/pages';
import { ArticlePage } from '@/features/get-started/pages/ArticlePage';
import { StartPage } from '@/features/get-started/pages/StartPage';

export const appRoutes: RouteObject[] = [
  { path: '/', element: <StartPage /> },
  ...articles.map((article) => ({
    path: article.path,
    element: <ArticlePage article={article} />,
  })),
];
