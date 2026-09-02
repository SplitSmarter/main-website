import type {Node, Edge} from '@xyflow/react';

const CENTER_X = 350;
const CENTER_Y = 200;
const RADIUS = 180;

export const outerNodesConfig = [
    {id: '2', label: '⚡ Client Store', angle: 0},
    {id: '3', label: '🌐 REST API', angle: 60},
    {id: '4', label: '💾 Database Engine', angle: 120},
    {id: '5', label: '🔒 Auth Provider', angle: 180},
    {id: '6', label: '📊 Metrics Collector', angle: 240},
    {id: '7', label: '🔔 Notification Service', angle: 300},
];

const calculatePosition = (angleInDegrees: number) => {
    const radians = (angleInDegrees * Math.PI) / 180;
    return {
        x: Math.round(CENTER_X + RADIUS * Math.cos(radians)),
        y: Math.round(CENTER_Y + RADIUS * Math.sin(radians)),
    };
};

const centralNode: Node = {
    id: '1',
    data: {label: '🌟 Central Hub'},
    position: {x: CENTER_X, y: CENTER_Y},
    style: {
        background: '#1c7ed6',
        color: '#fff',
        borderRadius: '12px',
        padding: '12px 20px',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(28, 126, 214, 0.3)',
        border: 'none',
    },
};

const peripheralNodes: Node[] = outerNodesConfig.map((item: { id: string; label: string; angle: number }) => ({
    id: item.id,
    data: {label: item.label},
    position: calculatePosition(item.angle),
    style: {
        background: 'var(--app-surface, #ffffff)',
        color: 'var(--app-text-main, #212529)',
        border: '1px solid var(--app-border, #dee2e6)',
        borderRadius: '8px',
        padding: '8px 14px',
        fontSize: '13px',
    },
}));

export const initialNodes: Node[] = [centralNode, ...peripheralNodes];

export const initialEdges: Edge[] = outerNodesConfig.map((item: { id: string; label: string; angle: number }) => ({
    id: `e1-${item.id}`,
    source: '1',
    target: item.id,
    type: 'floating',
    animated: false,
}));