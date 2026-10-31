import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { AppProvider } from './app/providers/AppProvider';
import { StartPage } from './features/get-started/pages/StartPage';

export function renderPage() {
  return renderToString(
    <AppProvider>
      <MemoryRouter>
        <StartPage />
      </MemoryRouter>
    </AppProvider>,
  );
}
