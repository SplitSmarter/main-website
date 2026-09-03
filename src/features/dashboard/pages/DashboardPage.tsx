import {Paper, Title, Text, Button, Stack, Group, Badge} from '@mantine/core';
import {notifications} from '@mantine/notifications';
import {useQuery} from '@tanstack/react-query';
import {create} from 'zustand';
import {IconSparkles} from '@tabler/icons-react';
import {DrawBorderButton} from "@/components/DrawBorderButton/DrawBorderButton.tsx";
import {DrawBorderButtonV2} from '@/components/DrawBorderButton/DrawBorderButtonV2';
import {IsometricButtonV2} from "@/components/IsometricButton/IsometricButtonV2.tsx";

interface DashboardStore {
    count: number;
    increment: () => void;
}

const useDashboardStore = create<DashboardStore>((set) => ({
    count: 1,
    increment: () => set((state) => ({count: state.count + 1})),
}));

const fetchStatus = async () => ({status: 'Operational', uptime: '99.99%'});

export function DashboardPage() {
    const {count, increment} = useDashboardStore();
    const {data} = useQuery({queryKey: ['status'], queryFn: fetchStatus});

    return (
        <div style={{backgroundColor: '#030407', minHeight: '100vh', width: '100%'}}>
            <Stack gap="xl">
                <Paper radius="md" p="xl" withBorder style={{backgroundColor: '#1a1b1e', borderColor: '#373a40'}}>
                    <Stack gap="md">
                        <Group justify="space-between">
                            <Title order={2} style={{color: '#fff'}}>Dashboard Feature</Title>
                            <Badge color="brand">{data?.status}</Badge>
                        </Group>
                        <Text color="dimmed">Isolated domain-driven module with local state management.</Text>
                        <Group>
                            <Button onClick={() => {
                                increment();
                                notifications.show({title: 'Success', message: `Execution #${count + 1}`});
                            }}>
                                Trigger Event ({count})
                            </Button>
                        </Group>
                    </Stack>
                </Paper>

                <Paper radius="md" p="xl" withBorder style={{backgroundColor: '#1a1b1e', borderColor: '#373a40'}}>
                    <Stack gap="md">
                        <Title order={3} style={{color: '#fff'}}>Isometric Button Test</Title>
                        <Text color="dimmed">Testing the shared IsometricButton components and color variants.</Text>

                        {/* Flexbox container with wrap and gap for clean layout */}
                        <Group justify="center" gap="lg" py="xl" style={{display: 'flex', flexWrap: 'wrap'}}>
                            <IsometricButtonV2 variant="cyan" onClick={() => notifications.show({
                                title: 'Cyan',
                                message: 'Cyan theme clicked!'
                            })}>
                                <IconSparkles size={18} color="#00f2fe"/>
                                <span>Cyan Theme</span>
                            </IsometricButtonV2>

                            <IsometricButtonV2 variant="emerald" onClick={() => notifications.show({
                                title: 'Emerald',
                                message: 'Emerald theme clicked!'
                            })}>
                                <IconSparkles size={18} color="#34d399"/>
                                <span>Emerald Theme</span>
                            </IsometricButtonV2>

                            <IsometricButtonV2 variant="sunset" onClick={() => notifications.show({
                                title: 'Sunset',
                                message: 'Sunset theme clicked!'
                            })}>
                                <IconSparkles size={18} color="#fbbf24"/>
                                <span>Sunset Theme</span>
                            </IsometricButtonV2>

                            <IsometricButtonV2 variant="amethyst" onClick={() => notifications.show({
                                title: 'Amethyst',
                                message: 'Amethyst theme clicked!'
                            })}>
                                <IconSparkles size={18} color="#e879f9"/>
                                <span>Amethyst Theme</span>
                            </IsometricButtonV2>

                            <IsometricButtonV2 variant="ruby" onClick={() => notifications.show({
                                title: 'Ruby',
                                message: 'Ruby theme clicked!'
                            })}>
                                <IconSparkles size={18} color="#fb7185"/>
                                <span>Ruby Theme</span>
                            </IsometricButtonV2>

                            <IsometricButtonV2 variant="midnight" onClick={() => notifications.show({
                                title: 'Midnight',
                                message: 'Midnight theme clicked!'
                            })}>
                                <IconSparkles size={18} color="#9ca3af"/>
                                <span>Midnight Theme</span>
                            </IsometricButtonV2>

                            <DrawBorderButton onClick={() => alert('SVG Draw Button Clicked!')}>
                                Hover To Draw
                            </DrawBorderButton>

                            <DrawBorderButtonV2 onClick={() => alert('SVG Draw Button Clicked!')}>
                                Hover To Draw V2
                            </DrawBorderButtonV2>
                        </Group>
                    </Stack>
                </Paper>
            </Stack>
        </div>
    );
}
