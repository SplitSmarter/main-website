import { AppShell, Group, Title, Button, Container } from '@mantine/core';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { IconDashboard, IconChartBar, IconSitemap } from '@tabler/icons-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header p="xs">
          <Container size="lg" h="100%">
            <Group justify="space-between" h="100%">
              <Group gap="xs">
                <Title order={3}>Enterprise System</Title>
              </Group>

              <Group gap="sm">
                <Button
                    variant={location.pathname === '/' ? 'filled' : 'subtle'}
                    leftSection={<IconDashboard size={18} />}
                    onClick={() => navigate('/')}
                >
                  Dashboard
                </Button>
                <Button
                    variant={location.pathname === '/analytics' ? 'filled' : 'subtle'}
                    leftSection={<IconChartBar size={18} />}
                    onClick={() => navigate('/analytics')}
                >
                  Analytics
                </Button>
                <Button
                    variant={location.pathname === '/workflow' ? 'filled' : 'subtle'}
                    leftSection={<IconSitemap size={18} />}
                    onClick={() => navigate('/workflow')}
                >
                  Workflow
                </Button>

                {/* Theme Toggle Component */}
                <ThemeToggle />
              </Group>
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Main style={{ backgroundColor: 'var(--app-bg)' }}>
          <Container size="lg" py="md">
            <Outlet />
          </Container>
        </AppShell.Main>
      </AppShell>
  );
}