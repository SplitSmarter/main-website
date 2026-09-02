import { ReactFlowProvider } from '@xyflow/react';
import { Title, Stack, ActionIcon, Group, Badge } from '@mantine/core';
import { IconWifi, IconBattery4, IconDeviceMobile, IconArrowLeft } from '@tabler/icons-react';
import { WorkflowInner } from './WorkflowPage';

interface WorkflowMobilePageProps {
    onBack?: () => void;
}

export function WorkflowMobilePage({ onBack }: WorkflowMobilePageProps) {
    return (
        <Stack gap="lg" align="center" style={{ width: '100%', padding: '20px 0' }}>
            {/* Header info bar */}
            <Group justify="space-between" style={{ width: '100%', maxWidth: '420px' }}>
                <Group gap="xs">
                    {/* Fixed color prop: changed "gray" to "brand" */}
                    <ActionIcon
                        variant="subtle"
                        color="brand"
                        onClick={() => onBack ? onBack() : window.history.back()}
                    >
                        <IconArrowLeft size={20} />
                    </ActionIcon>
                    <Title order={4}>Mobile UI Preview</Title>
                </Group>

                {/* Fixed color prop: changed "cyan" to "teal" */}
                <Badge color="teal" variant="light" leftSection={<IconDeviceMobile size={14} />}>
                    Mobile Screen
                </Badge>
            </Group>

            {/* Mobile Device Frame Container */}
            <div
                style={{
                    width: '390px',
                    height: '780px',
                    backgroundColor: '#1a1b1e',
                    borderRadius: '48px',
                    padding: '12px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 10px #2c2e33',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                {/* Hardware Speaker Notch */}
                <div
                    style={{
                        position: 'absolute',
                        top: '12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '120px',
                        height: '24px',
                        backgroundColor: '#2c2e33',
                        borderBottomLeftRadius: '14px',
                        borderBottomRightRadius: '14px',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '40px',
                            height: '4px',
                            backgroundColor: '#495057',
                            borderRadius: '2px',
                        }}
                    />
                </div>

                {/* Mobile Inner Screen */}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#ffffff',
                        borderRadius: '36px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                    }}
                >
                    {/* Status Bar Header */}
                    <div
                        style={{
                            height: '44px',
                            padding: '0 24px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '13px',
                            fontWeight: 600,
                            zIndex: 90,
                            backgroundColor: '#f8f9fa',
                            borderBottom: '1px solid #e9ecef',
                        }}
                    >
                        <span>9:41</span>
                        <Group gap={6}>
                            <IconWifi size={14} />
                            <IconBattery4 size={16} />
                        </Group>
                    </div>

                    {/* Canvas Container inside mobile body */}
                    <div style={{ flex: 1, width: '100%', height: 'calc(100% - 44px)' }}>
                        <ReactFlowProvider>
                            <WorkflowInner />
                        </ReactFlowProvider>
                    </div>

                    {/* Mobile Home Bar Indicator */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '130px',
                            height: '5px',
                            backgroundColor: '#000000',
                            borderRadius: '3px',
                            zIndex: 100,
                            opacity: 0.6,
                        }}
                    />
                </div>
            </div>
        </Stack>
    );
}