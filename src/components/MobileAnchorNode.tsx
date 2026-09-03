import {memo} from 'react';
import {Handle, Position} from '@xyflow/react';
import type {NodeProps} from '@xyflow/react';
import {MobileFrame} from '@/components/MobileFrame.tsx';
import {DynamicNodeScreen} from "@/features/workflow/mobile/screens.tsx";

export interface MobileAnchorNodeData {
    activeNodeId: string;
    activeNodeLabel: string;
    width?: number;
    height?: number;
    isVertical?: boolean;

    [key: string]: unknown;
}

export const MobileAnchorNode = memo(({data}: NodeProps) => {
    const nodeData = data as unknown as MobileAnchorNodeData;

    const nodeWidth = nodeData.width || 210;
    const nodeHeight = nodeData.height || 440;
    const isVertical = !!nodeData.isVertical;

    // Standard base dimensions of the MobileFrame mockup before scaling
    const BASE_PHONE_WIDTH = 320;
    const BASE_PHONE_HEIGHT = 650;

    const scaleX = (nodeWidth - 20) / BASE_PHONE_WIDTH;
    const scaleY = (nodeHeight - 20) / BASE_PHONE_HEIGHT;
    const dynamicScale = Math.min(scaleX, scaleY, 0.75);

    // Dynamically switch handle position and layout behavior based on screen orientation
    const handlePosition = isVertical ? Position.Top : Position.Left;

    const sourceHandleStyle = isVertical ? {
        background: '#15aabf',
        width: 10,
        height: 10,
        top: 6,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20
    } : {
        background: '#15aabf',
        width: 10,
        height: 10,
        left: 8,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20
    };

    const targetHandleStyle = sourceHandleStyle;

    return (
        <div
            style={{
                pointerEvents: 'all',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px dashed #12b886',
                backgroundColor: 'rgba(18, 184, 134, 0.05)',
                borderRadius: '16px',
                width: nodeWidth,
                height: nodeHeight,
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            {/* Dynamic Handles adapting to layout orientation */}
            <Handle
                type="source"
                position={handlePosition}
                id="dynamic-source"
                style={sourceHandleStyle}
            />
            <Handle
                type="target"
                position={handlePosition}
                id="dynamic-target"
                style={targetHandleStyle}
            />

            {/* Scaled Mobile Frame Wrapper */}
            <div
                style={{
                    transform: `scale(${dynamicScale})`,
                    transformOrigin: 'center center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <MobileFrame>
                    <DynamicNodeScreen
                        activeNodeId={nodeData.activeNodeId || '2'}
                        activeNodeLabel={nodeData.activeNodeLabel || '⚡ Client Store'}
                    />
                </MobileFrame>
            </div>
        </div>
    );
});

MobileAnchorNode.displayName = 'MobileAnchorNode';