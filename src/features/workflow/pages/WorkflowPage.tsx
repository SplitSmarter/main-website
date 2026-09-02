import { useCallback, useRef } from 'react';
import { Paper, Title, Text, Stack, Button, Group } from '@mantine/core';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';
import type { Connection, Node, Edge, CoordinateExtent } from '@xyflow/react';
import { IconRotateDot } from '@tabler/icons-react';
import '@xyflow/react/dist/style.css';

import { initialNodes as baseNodes, initialEdges as baseEdges } from '../config/flowData';
import { FloatingEdge } from '@/components/FloatingEdge.tsx';

const edgeTypes = {
    floating: FloatingEdge,
};

const CENTER_NODE_ID = '1';
const FIXED_NODE_ID = 'fixed-anchor-node';
const DYNAMIC_EDGE_ID = 'edge-fixed-to-active';
const RADIUS = 180;
const ANIMATION_DURATION = 500;

// Bounding box for moving wheel nodes [ [minX, minY], [maxX, maxY] ]
const WHEEL_NODE_EXTENT: CoordinateExtent = [
    [100, 100],
    [600, 420],
];

// Top 12 o'clock position for active clicked node
const TARGET_SLOT_ANGLE = -Math.PI / 2;

// 1. Fixed anchor node placed OUTSIDE the bounding box boundary (e.g., at Y = 20)
const fixedAnchorNode: Node = {
    id: FIXED_NODE_ID,
    type: 'default',
    data: { label: 'External Fixed Anchor' },
    position: { x: 350, y: 20 }, // Placed outside the [100, 100] top limit
    draggable: false,
    selectable: false,
    style: {
        background: '#15aabf',
        color: '#fff',
        border: '2px solid #0b7285',
        fontWeight: 600,
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(21, 170, 191, 0.35)',
    },
};

// 2. Attach extent limits strictly to the wheel nodes (excluding the anchor)
const formattedBaseNodes = baseNodes.map((node) => ({
    ...node,
    extent: WHEEL_NODE_EXTENT, // Restricts user drag & animation within bounds
}));

const initialNodes: Node[] = [fixedAnchorNode, ...formattedBaseNodes];

const initialEdges: Edge[] = [
    {
        id: DYNAMIC_EDGE_ID,
        source: FIXED_NODE_ID,
        target: '2',
        type: 'floating',
        animated: true,
        style: { stroke: '#15aabf', strokeWidth: 3 },
    },
    ...baseEdges,
];

// Normalize angle to range [-PI, PI]
function normalizeAngle(angle: number): number {
    let a = angle % (2 * Math.PI);
    if (a > Math.PI) a -= 2 * Math.PI;
    if (a < -Math.PI) a += 2 * Math.PI;
    return a;
}

// Smooth Bezier Easing
function cubicBezierEase(t: number): number {
    const p1 = 0.25;
    const p3 = 0.5;
    return 3 * Math.pow(1 - t, 2) * t * p1 + 3 * (1 - t) * Math.pow(t, 2) * p3 + Math.pow(t, 3);
}

export function WorkflowInner() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { getNodes, setViewport } = useReactFlow();
    const animFrameIdRef = useRef<number | null>(null);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'floating' }, eds)),
        [setEdges]
    );

    const onNodeMouseEnter = useCallback(
        (_: React.MouseEvent, node: Node) => {
            setEdges((eds) =>
                eds.map((edge) => {
                    if (edge.source === node.id || edge.target === node.id) {
                        return { ...edge, animated: true };
                    }
                    return edge;
                })
            );
        },
        [setEdges]
    );

    const onNodeMouseLeave = useCallback(() => {
        setEdges((eds) =>
            eds.map((edge) => {
                if (edge.id === DYNAMIC_EDGE_ID) return edge;
                return { ...edge, animated: false };
            })
        );
    }, [setEdges]);

    const onNodeDrag = useCallback((_: MouseEvent | TouchEvent, node: Node) => {
        if (node.id === FIXED_NODE_ID) return;

        setNodes((nds) =>
            nds.map((n) => (n.id === node.id ? { ...n, position: node.position } : n))
        );
    }, [setNodes]);

    const onNodeClick = useCallback(
        (_: React.MouseEvent, clickedNode: Node) => {
            if (clickedNode.id === CENTER_NODE_ID || clickedNode.id === FIXED_NODE_ID) return;

            // Reroute active tracking edge to newly clicked node
            setEdges((eds) =>
                eds.map((edge) => {
                    if (edge.id === DYNAMIC_EDGE_ID) {
                        return { ...edge, target: clickedNode.id };
                    }
                    return edge;
                })
            );

            if (animFrameIdRef.current) {
                cancelAnimationFrame(animFrameIdRef.current);
            }

            const currentNodes = getNodes();
            const centerNode = currentNodes.find((n) => n.id === CENTER_NODE_ID);
            if (!centerNode) return;

            const centerX = centerNode.position.x;
            const centerY = centerNode.position.y;

            const outerNodes = currentNodes.filter(
                (n) => n.id !== CENTER_NODE_ID && n.id !== FIXED_NODE_ID
            );

            const nodePositions = outerNodes.map((node) => {
                const dx = node.position.x - centerX;
                const dy = node.position.y - centerY;
                let angle = Math.atan2(dy, dx);
                if (angle < 0) angle += 2 * Math.PI;
                const dist = Math.sqrt(dx * dx + dy * dy);

                return { node, angle, dist };
            });

            nodePositions.sort((a, b) => a.angle - b.angle);

            const totalOuter = nodePositions.length;
            const angleStep = (2 * Math.PI) / totalOuter;

            const clickedIndex = nodePositions.findIndex(({ node }) => node.id === clickedNode.id);
            if (clickedIndex === -1) return;

            const clickedItem = nodePositions[clickedIndex];
            const globalRotationDelta = normalizeAngle(TARGET_SLOT_ANGLE - clickedItem.angle);

            const animState = nodePositions.map(({ node, angle, dist }, index) => {
                const relativeIndex = index - clickedIndex;
                const idealBaseAngle = clickedItem.angle + relativeIndex * angleStep;
                const rawTargetAngle = idealBaseAngle + globalRotationDelta;

                const deltaAngle = normalizeAngle(rawTargetAngle - angle);

                return {
                    id: node.id,
                    startAngle: angle,
                    targetAngle: angle + deltaAngle,
                    startDist: dist,
                    targetDist: RADIUS,
                };
            });

            const startTime = performance.now();

            const animateStep = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
                const eased = cubicBezierEase(progress);

                setNodes((nds) =>
                    nds.map((n) => {
                        if (n.id === CENTER_NODE_ID || n.id === FIXED_NODE_ID) return n;

                        const state = animState.find((s) => s.id === n.id);
                        if (!state) return n;

                        const currentDist = state.startDist + (state.targetDist - state.startDist) * eased;
                        const currentAngle = state.startAngle + (state.targetAngle - state.startAngle) * eased;

                        return {
                            ...n,
                            position: {
                                x: Math.round(centerX + currentDist * Math.cos(currentAngle)),
                                y: Math.round(centerY + currentDist * Math.sin(currentAngle)),
                            },
                        };
                    })
                );

                if (progress < 1) {
                    animFrameIdRef.current = requestAnimationFrame(animateStep);
                }
            };

            animFrameIdRef.current = requestAnimationFrame(animateStep);
        },
        [getNodes, setNodes, setEdges]
    );

    const handleReset = () => {
        setNodes(initialNodes);
        setEdges(initialEdges);
        setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 300 });
    };

    return (
        <Stack gap="md">
            <Group justify="space-between" align="flex-end">
                <div>
                    <Title order={2}>Node-Based Architecture Flow</Title>
                    <Text color="dimmed" size="sm">
                        The Fixed Anchor node sits outside the wheel's bounding box area, while all satellite nodes remain strictly locked within the boundary.
                    </Text>
                </div>

                <Button
                    variant="default"
                    leftSection={<IconRotateDot size={16} />}
                    onClick={handleReset}
                >
                    Reset Layout
                </Button>
            </Group>

            <Paper radius="md" withBorder style={{ height: '550px', width: '100%', overflow: 'hidden' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    edgeTypes={edgeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeMouseEnter={onNodeMouseEnter}
                    onNodeMouseLeave={onNodeMouseLeave}
                    onNodeDrag={onNodeDrag}
                    onNodeClick={onNodeClick}
                    /* Notice: nodeExtent is removed from ReactFlow container */
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}
                    panOnScroll={false}
                    minZoom={1}
                    maxZoom={1}
                    fitView
                >
                    <Controls showZoom={false} />
                    <MiniMap zoomable={false} pannable={false} />
                    <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
                </ReactFlow>
            </Paper>
        </Stack>
    );
}

export function WorkflowPage() {
    return (
        <ReactFlowProvider>
            <WorkflowInner />
        </ReactFlowProvider>
    );
}