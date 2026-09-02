import { useState } from 'react';
import { Title, Stack, ActionIcon, Group, Badge, SegmentedControl } from '@mantine/core';
import { IconDeviceMobile, IconArrowLeft } from '@tabler/icons-react';
import { DynamicNodeScreen } from "@/features/workflow/mobile/screens.tsx";
import { MobileFrame } from "@/components/MobileFrame.tsx";

interface WorkflowMobilePageProps {
    onBack?: () => void;
}

// Maps control values to corresponding nodeId and screen labels
const SCREEN_MAP: Record<string, { id: string; label: string }> = {
    summary: { id: '2', label: 'Client Store' },
    api: { id: '3', label: 'REST API' },
    database: { id: '4', label: 'Database Engine' },
    auth: { id: '5', label: 'Auth Provider' },
    metrics: { id: '6', label: 'Metrics Collector' },
    notifications: { id: '7', label: 'Notification Service' },
};

export function WorkflowMobilePage({ onBack }: WorkflowMobilePageProps) {
    const [selectedScreen, setSelectedScreen] = useState<string>('summary');

    const activeNode = SCREEN_MAP[selectedScreen] ?? SCREEN_MAP.summary;

    return (
        <Stack gap="lg" align="center" style={{ width: '100%', padding: '24px 0' }}>
            {/* Header with Navigation */}
            <Group justify="space-between" style={{ width: '100%', maxWidth: '340px' }}>
                <Group gap="xs">
                    <ActionIcon
                        variant="subtle"
                        color="brand"
                        onClick={() => (onBack ? onBack() : window.history.back())}
                    >
                        <IconArrowLeft size={18} />
                    </ActionIcon>
                    <Title order={4}>3D Mobile View</Title>
                </Group>

                <Badge color="teal" variant="light" leftSection={<IconDeviceMobile size={12} />}>
                    3D Perspective
                </Badge>
            </Group>

            {/* Screen Selector Control */}
            <SegmentedControl
                value={selectedScreen}
                onChange={(value) => setSelectedScreen(value)}
                data={[
                    { label: 'Store', value: 'summary' },
                    { label: 'API', value: 'api' },
                    { label: 'DB', value: 'database' },
                    { label: 'Auth', value: 'auth' },
                    { label: 'Metrics', value: 'metrics' },
                    { label: 'Alerts', value: 'notifications' },
                ]}
                color="teal"
                size="xs"
                radius="md"
            />

            {/* Dynamic Mobile Frame rendering selected Node Screen */}
            <MobileFrame>
                <DynamicNodeScreen
                    activeNodeId={activeNode.id}
                    activeNodeLabel={activeNode.label}
                />
            </MobileFrame>
        </Stack>
    );
}