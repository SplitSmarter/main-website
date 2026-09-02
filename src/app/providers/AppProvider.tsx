import type { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appTheme, resolver } from '@/config/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppProvider({ children }: { children: ReactNode }) {
  return (
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={appTheme} cssVariablesResolver={resolver} defaultColorScheme="auto">
          <Notifications />
          {children}
        </MantineProvider>
      </QueryClientProvider>
  );
}