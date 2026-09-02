import { Paper, Title, Text } from '@mantine/core';

export function AnalyticsPage() {
  return (
    <Paper radius="md" p="xl" withBorder>
      <Title order={2}>Analytics Feature</Title>
      <Text color="dimmed" mt="sm">
        Separate feature domain. Scales independently without affecting Dashboard modules.
      </Text>
    </Paper>
  );
}
