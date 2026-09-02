import {Stack, Paper, Title, Text, Badge, Progress, Switch, Group, Code, Button, Box} from '@mantine/core';
import {IconRefresh, IconActivity, IconDatabase, IconLock, IconBell} from '@tabler/icons-react';

export interface ScreenProps {
    nodeId: string;
    label: string;
}

// Visual Wrapper Helper for Screen Components
function ScreenBoundaryWrapper({children, title}: { children: React.ReactNode; title: string }) {
    return (
        <Box
            style={{
                border: '2px dashed #51cf66', // Green: Screen Outer Bound
                backgroundColor: 'rgba(81, 207, 102, 0.05)',
                borderRadius: '8px',
                position: 'relative',
                margin: '2px',
            }}
        >
            <Text
                size="8px"
                fw={700}
                c="green.8"
                style={{
                    position: 'absolute',
                    top: '-14px',
                    right: '4px',
                    backgroundColor: '#fff',
                    padding: '0 3px',
                    border: '1px solid #51cf66',
                    borderRadius: '2px',
                    zIndex: 5,
                }}
            >
                {title} Screen Bound
            </Text>
            {children}
        </Box>
    );
}

// ⚡ Client Store Screen (Node 2)
export function ClientStoreScreen({nodeId, label}: ScreenProps) {
    return (
        <ScreenBoundaryWrapper title="Client Store">
            <Stack gap="xs" p="xs">
                <Paper p="xs" radius="md" style={{
                    background: 'linear-gradient(135deg, #15aabf 0%, #0b7285 100%)',
                    color: '#fff',
                    border: '1.5px dashed #cc5de8'
                }}>
                    <Group justify="space-between">
                        <Text size="xs" style={{opacity: 0.85}}>Active Anchor</Text>
                        <Badge size="xs" color="teal" variant="filled">Connected</Badge>
                    </Group>
                    <Title order={5} mt={4}>{label}</Title>
                    <Text size="xs" style={{opacity: 0.8}}>ID: #{nodeId}</Text>
                </Paper>

                <Paper p="xs" radius="md" withBorder style={{border: '1.5px dashed #cc5de8'}}>
                    <Text size="xs" fw={600} c="dimmed" mb={4}>State Cache</Text>
                    <Progress value={85} color="teal" size="sm" radius="xl" mb="xs"/>
                    <Group justify="space-between">
                        <Text size="xs">Cache Sync</Text>
                        <Text size="xs" fw={600}>Optimized</Text>
                    </Group>
                </Paper>
            </Stack>
        </ScreenBoundaryWrapper>
    );
}

// 🌐 REST API Screen (Node 3)
export function RestApiScreen({nodeId, label}: ScreenProps) {
    return (
        <ScreenBoundaryWrapper title="REST API">
            <Stack gap="xs" p="xs">
                <Title order={6}>{label} (#{nodeId})</Title>
                <Paper p="xs" radius="md" withBorder style={{border: '1.5px dashed #cc5de8'}}>
                    <Group justify="space-between" mb={4}>
                        <Badge size="xs" color="blue">GET /api/v1/flow</Badge>
                        <Text size="xs" c="green" fw={700}>200 OK</Text>
                    </Group>
                    <Text size="xs" c="dimmed">Latency: 24ms</Text>
                </Paper>
                <Paper p="xs" radius="md" withBorder style={{background: '#f8f9fa', border: '1.5px dashed #cc5de8'}}>
                    <Code block>
                        {`{\n  "status": "online",\n  "node": "${label}",\n  "id": "${nodeId}"\n}`}
                    </Code>
                </Paper>
            </Stack>
        </ScreenBoundaryWrapper>
    );
}

// 💾 Database Engine Screen (Node 4)
export function DatabaseScreen({nodeId, label}: ScreenProps) {
    return (
        <ScreenBoundaryWrapper title="Database">
            <Stack gap="xs" p="xs">
                <Group justify="space-between">
                    <Group gap="xs">
                        <IconDatabase size={16}/>
                        <Title order={6}>{label}</Title>
                    </Group>
                    <Text size="xs" c="dimmed">#{nodeId}</Text>
                </Group>
                <Paper p="xs" radius="md" withBorder style={{border: '1.5px dashed #cc5de8'}}>
                    <Text size="xs" fw={600}>Queries / sec</Text>
                    <Title order={4} c="blue">1,420 QPS</Title>
                    <Progress value={42} color="blue" size="xs" mt="xs"/>
                </Paper>
                <Group justify="space-between" p="4px" style={{border: '1.5px dashed #cc5de8', borderRadius: '4px'}}>
                    <Text size="xs" c="dimmed">Active Connections</Text>
                    <Badge size="xs" variant="light" color="blue">64 / 100</Badge>
                </Group>
            </Stack>
        </ScreenBoundaryWrapper>
    );
}

// 🔒 Auth Provider Screen (Node 5)
export function AuthProviderScreen({nodeId, label}: ScreenProps) {
    return (
        <ScreenBoundaryWrapper title="Auth Provider">
            <Stack gap="xs" p="xs">
                <Group justify="space-between">
                    <Group gap="xs">
                        <IconLock size={16}/>
                        <Title order={6}>{label}</Title>
                    </Group>
                    <Text size="xs" c="dimmed">#{nodeId}</Text>
                </Group>
                <Paper p="xs" radius="md" withBorder style={{border: '1.5px dashed #cc5de8'}}>
                    <Group justify="space-between" mb="xs">
                        <Text size="xs">Token Validation</Text>
                        <Switch size="xs" color="teal" defaultChecked/>
                    </Group>
                    <Group justify="space-between">
                        <Text size="xs">OAuth 2.0 State</Text>
                        <Badge size="xs" color="green">Secure</Badge>
                    </Group>
                </Paper>
            </Stack>
        </ScreenBoundaryWrapper>
    );
}

// 📊 Metrics Collector Screen (Node 6)
export function MetricsScreen({nodeId, label}: ScreenProps) {
    return (
        <ScreenBoundaryWrapper title="Metrics">
            <Stack gap="xs" p="xs">
                <Group justify="space-between">
                    <Group gap="xs">
                        <IconActivity size={16}/>
                        <Title order={6}>{label}</Title>
                    </Group>
                    <Text size="xs" c="dimmed">#{nodeId}</Text>
                </Group>
                <Paper p="xs" radius="md" withBorder style={{border: '1.5px dashed #cc5de8'}}>
                    <Text size="xs" c="dimmed">CPU Utilization</Text>
                    <Progress value={28} color="teal" size="sm" my={4}/>
                    <Text size="xs" c="dimmed">Memory Usage</Text>
                    <Progress value={61} color="cyan" size="sm" mt={4}/>
                </Paper>
            </Stack>
        </ScreenBoundaryWrapper>
    );
}

// 🔔 Notification Service Screen (Node 7)
export function NotificationScreen({nodeId, label}: ScreenProps) {
    return (
        <ScreenBoundaryWrapper title="Notification">
            <Stack gap="xs" p="xs">
                <Group justify="space-between">
                    <Group gap="xs">
                        <IconBell size={16}/>
                        <Title order={6}>{label}</Title>
                    </Group>
                    <Text size="xs" c="dimmed">#{nodeId}</Text>
                </Group>
                <Paper p="xs" radius="md" withBorder style={{borderColor: '#15aabf', borderStyle: 'dashed'}}>
                    <Text size="xs" fw={600}>Push Relay Active</Text>
                    <Text size="xs" c="dimmed">Queued Messages: 0</Text>
                </Paper>
                <Button size="xs" color="teal" variant="light" leftSection={<IconRefresh size={12}/>}>
                    Flush Queue
                </Button>
            </Stack>
        </ScreenBoundaryWrapper>
    );
}

// Dynamic Resolver Component
export function DynamicNodeScreen({activeNodeId, activeNodeLabel}: { activeNodeId: string; activeNodeLabel: string }) {
    const props = {nodeId: activeNodeId, label: activeNodeLabel};
    switch (activeNodeId) {
        case '2':
            return <ClientStoreScreen {...props} />;
        case '3':
            return <RestApiScreen {...props} />;
        case '4':
            return <DatabaseScreen {...props} />;
        case '5':
            return <AuthProviderScreen {...props} />;
        case '6':
            return <MetricsScreen {...props} />;
        case '7':
            return <NotificationScreen {...props} />;
        default:
            return <ClientStoreScreen {...props} />;
    }
}