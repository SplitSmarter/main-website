import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router';
import { AppProvider } from './app/providers/AppProvider';
import { appRoutes } from './app/route-table';
import { pageHeads } from './content/pages';

export { pageHeads };

export function renderPage(url: string) {
  return renderToString(
    <AppProvider>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          {appRoutes.flatMap((route) => (
            route.path ? [<Route key={route.path} path={route.path} element={route.element} />] : []
          ))}
        </Routes>
      </MemoryRouter>
    </AppProvider>,
  );
}
