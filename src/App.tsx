// src/App.tsx
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import {
  MantineProvider,
  Container,
  Title,
  Text,
  Button,
  Group,
  Paper,
  Badge,
  Stack,
  createTheme
} from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { IconSparkles, IconRefresh, IconCheck } from '@tabler/icons-react';
import { create } from 'zustand';

// 1. TanStack Query Setup
const queryClient = new QueryClient();

// 2. Zustand Global Client State
interface AppStore {
  activeCount: number;
  increment: () => void;
}

const useAppStore = create<AppStore>((set) => ({
  activeCount: 1,
  increment: () => set((state) => ({ activeCount: state.activeCount + 1 })),
}));

// Mock API Call for Server State
const fetchStatus = async () => {
  return new Promise<{ status: string; uptime: string }>((resolve) =>
      setTimeout(() => resolve({ status: 'Operational', uptime: '99.99%' }), 800)
  );
};

// 3. Page Component
function DashboardPage() {
  const { activeCount, increment } = useAppStore();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['system-status'],
    queryFn: fetchStatus,
  });

  const handleAction = () => {
    increment();
    notifications.show({
      title: 'Action Triggered',
      message: `Local state updated! New count: ${activeCount + 1}`,
      color: 'teal',
      icon: <IconCheck size={16} />,
    });
  };

  return (
      <Container size="sm" py="xl">
        <Paper radius="md" p="xl" withBorder shadow="sm">
          <Stack gap="md">
            <Group justify="space-between">
              <Badge variant="light" color="blue" size="lg">
                Main Website Dashboard
              </Badge>
              <Badge variant="outline" color={isLoading ? 'yellow' : 'green'}>
                {isLoading ? 'Checking API...' : data?.status}
              </Badge>
            </Group>

            <Title order={2}>Enterprise Performance Engine</Title>
            <Text c="dimmed" size="sm">
              Powered by Vite, Mantine v7, TanStack Query, and Zustand. Zero runtime CSS overhead with instant speed.
            </Text>

            <Paper bg="var(--mantine-color-gray-0)" p="md" radius="sm">
              <Group justify="space-between">
                <div>
                  <Text size="xs" c="dimmed" fw={700} tt="uppercase">System Uptime</Text>
                  <Text fw={600}>{isLoading ? 'Loading...' : data?.uptime}</Text>
                </div>
                <div>
                  <Text size="xs" c="dimmed" fw={700} tt="uppercase">Local Actions</Text>
                  <Text fw={600}>{activeCount} Execution(s)</Text>
                </div>
              </Group>
            </Paper>

            <Group justify="flex-end" mt="md">
              <Button
                  variant="default"
                  leftSection={<IconRefresh size={16} />}
                  onClick={() => refetch()}
                  loading={isLoading}
              >
                Sync API
              </Button>
              <Button
                  leftSection={<IconSparkles size={16} />}
                  onClick={handleAction}
                  color="blue"
              >
                Trigger Action
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
  );
}

// 4. Root App Container
const theme = createTheme({ primaryColor: 'blue' });

export default function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <Notifications />
          <DashboardPage />
        </MantineProvider>
      </QueryClientProvider>
  );
}