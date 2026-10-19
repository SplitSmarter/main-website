import type {Node, Edge} from '@xyflow/react';
// Do not import CSS modules here since it's now a global CSS file

const CENTER_X = 350;
const CENTER_Y = 200;
const RADIUS = 180;

export const outerNodesConfig = [
    {id: '2', label: '📊 Smart Ledger', angle: 0, theme: 'cyan'},
    {id: '3', label: '🤝 Debt Sync', angle: 60, theme: 'emerald'},
    {id: '4', label: '👤 User Profiles', angle: 120, theme: 'sunset'},
    {id: '5', label: '💸 UPI Payments', angle: 180, theme: 'amethyst'},
    {id: '6', label: '💱 Multi-Currency', angle: 240, theme: 'ruby'},
    {id: '7', label: '📍 Analytics', angle: 300, theme: 'midnight'},
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
    data: {label: '🌟 Split Smart Core'},
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

const peripheralNodes: Node[] = outerNodesConfig.map((item) => ({
    id: item.id,
    data: {label: item.label},
    position: calculatePosition(item.angle),
    className: `satelliteNodeCard ${item.theme}`,
}));

export const initialNodes: Node[] = [centralNode, ...peripheralNodes];

export const initialEdges: Edge[] = outerNodesConfig.map((item) => ({
    id: `e1-${item.id}`,
    source: '1',
    target: item.id,
    type: 'floating',
    animated: false,
}));