import type { ReactNode } from 'react';
import { Group } from '@mantine/core';
import { IconWifi, IconBattery4 } from '@tabler/icons-react';

export interface MobileFrameProps {
    children: ReactNode;
    /** Width of the device frame (default: '280px') */
    width?: string;
    /** Height of the device frame (default: '560px') */
    height?: string;
    /** Time string displayed in the status bar (default: '09:41') */
    time?: string;
    /** Optional custom 3D transform style */
    transform?: string;
}

export function MobileFrame({
                                children,
                                width = '280px',
                                height = '560px',
                                time = '09:41',
                                transform = 'rotateY(-14deg) rotateX(8deg) rotateZ(1deg)',
                            }: MobileFrameProps) {
    return (
        <div style={{ perspective: '1200px', padding: '20px' }}>
            {/* 3D Smartphone Body */}
            <div
                style={{
                    width,
                    height,
                    backgroundColor: '#111318',
                    borderRadius: '38px',
                    padding: '10px',
                    transform,
                    transformStyle: 'preserve-3d',
                    boxShadow: `
                        -12px 18px 32px rgba(0, 0, 0, 0.45),
                        -4px 6px 12px rgba(0, 0, 0, 0.25),
                        inset 0 0 0 2px #2c2e33,
                        inset 2px 2px 4px rgba(255, 255, 255, 0.15)
                    `,
                    position: 'relative',
                    transition: 'transform 0.4s ease',
                }}
            >
                {/* Camera / Earpiece Notch */}
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80px',
                        height: '18px',
                        backgroundColor: '#1e2025',
                        borderBottomLeftRadius: '10px',
                        borderBottomRightRadius: '10px',
                        zIndex: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '28px',
                            height: '3px',
                            backgroundColor: '#495057',
                            borderRadius: '2px',
                        }}
                    />
                </div>

                {/* Mobile Screen Wrapper */}
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '28px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxShadow: 'inset 0 0 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* Mobile Status Bar */}
                    <div
                        style={{
                            height: '36px',
                            padding: '0 18px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '11px',
                            fontWeight: 700,
                            zIndex: 90,
                            backgroundColor: '#ffffff',
                            borderBottom: '1px solid #e9ecef',
                            color: '#212529',
                        }}
                    >
                        <span>{time}</span>
                        <Group gap={4}>
                            <IconWifi size={12} />
                            <IconBattery4 size={14} />
                        </Group>
                    </div>

                    {/* Dynamic Screen Content */}
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                        {children}
                    </div>

                    {/* Mobile Home Bar Indicator */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '6px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '90px',
                            height: '4px',
                            backgroundColor: '#000000',
                            borderRadius: '2px',
                            opacity: 0.4,
                            pointerEvents: 'none',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}