import { Paper, Title, Text, Button, Stack, Group, Badge, Center } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { IconSparkles } from '@tabler/icons-react';
import { IsometricButton } from '@/components/IsometricButton/IsometricButton';

interface DashboardStore {
  count: number;
  increment: () => void;
}

const useDashboardStore = create<DashboardStore>((set) => ({
  count: 1,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

const fetchStatus = async () => ({ status: 'Operational', uptime: '99.99%' });

export function DashboardPage() {
  const { count, increment } = useDashboardStore();
  const { data } = useQuery({ queryKey: ['status'], queryFn: fetchStatus });

  return (
    <div style={{ backgroundColor: '#030407', minHeight: '100vh', width: '100%' }}>
      <Stack gap="xl">
        <Paper radius="md" p="xl" withBorder style={{ backgroundColor: '#1a1b1e', borderColor: '#373a40' }}>
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={2} style={{ color: '#fff' }}>Dashboard Feature</Title>
              <Badge color="brand">{data?.status}</Badge>
            </Group>
            <Text color="dimmed">Isolated domain-driven module with local state management.</Text>
            <Group>
              <Button onClick={() => {
                increment();
                notifications.show({ title: 'Success', message: `Execution #${count + 1}` });
              }}>
                Trigger Event ({count})
              </Button>
            </Group>
          </Stack>
        </Paper>

        <Paper radius="md" p="xl" withBorder style={{ backgroundColor: '#1a1b1e', borderColor: '#373a40' }}>
          <Stack gap="md">
            <Title order={3} style={{ color: '#fff' }}>Isometric Button Test</Title>
            <Text color="dimmed">Testing the shared IsometricButton component in the Dashboard feature.</Text>
            <Center py="xl">
              <IsometricButton onClick={() => notifications.show({ title: 'Button Clicked', message: 'Isometric button action triggered!' })}>
                <IconSparkles size={18} color="#00f2fe" />
                <span>Explore Platform</span>
              </IsometricButton>
            </Center>
          </Stack>
        </Paper>
      </Stack>
    </div>
  );
}
