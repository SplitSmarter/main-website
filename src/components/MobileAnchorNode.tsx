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

    [key: string]: unknown;
}

export const MobileAnchorNode = memo(({data}: NodeProps) => {
    const nodeData = data as unknown as MobileAnchorNodeData;

    // Default fallback size if dimensions aren't passed yet
    const nodeWidth = nodeData.width || 210;
    const nodeHeight = nodeData.height || 440;

    // Standard base dimensions of the MobileFrame mockup before scaling
    const BASE_PHONE_WIDTH = 320;
    const BASE_PHONE_HEIGHT = 650;

    // Dynamically calculate scale factors to fit cleanly within the node bounds with padding
    const scaleX = (nodeWidth - 20) / BASE_PHONE_WIDTH;
    const scaleY = (nodeHeight - 20) / BASE_PHONE_HEIGHT;
    const dynamicScale = Math.min(scaleX, scaleY, 0.75); // Cap max scale

    return (
        <div
            style={{
                pointerEvents: 'all',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // Dynamically sized node debug boundary
                border: '1.5px dashed #12b886',
                backgroundColor: 'rgba(18, 184, 134, 0.05)',
                borderRadius: '16px',
                width: nodeWidth,
                height: nodeHeight,
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            {/* Handles inset directly into the dynamic mobile left edge */}
            <Handle
                type="source"
                position={Position.Left}
                id="left-source"
                style={{
                    background: '#15aabf',
                    width: 10,
                    height: 10,
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 20
                }}
            />
            <Handle
                type="target"
                position={Position.Left}
                id="left-target"
                style={{
                    background: '#15aabf',
                    width: 10,
                    height: 10,
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 20
                }}
            />

            {/* Dynamically Scaled Mobile Frame Wrapper */}
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