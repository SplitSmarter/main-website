import {useCallback, useRef, useEffect} from 'react';
import {Title, Text, Stack, Button, Group, Box} from '@mantine/core';
import {useElementSize} from '@mantine/hooks';
import {
    ReactFlow,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    useReactFlow,
    ReactFlowProvider,
    applyNodeChanges,
} from '@xyflow/react';
import type {NodeTypes, Connection, Node, NodeChange} from '@xyflow/react';
import {IconRotateDot} from '@tabler/icons-react';
import '@xyflow/react/dist/style.css';

import {initialNodes as baseNodes, initialEdges as baseEdges, outerNodesConfig} from '../config/flowData';
import {FloatingEdge} from '@/components/FloatingEdge.tsx';
import {MobileAnchorNode} from "@/components/MobileAnchorNode.tsx";

const nodeTypes: NodeTypes = {
    mobileAnchor: MobileAnchorNode,
};

const edgeTypes = {
    floating: FloatingEdge,
};

const CENTER_NODE_ID = '1';
const FIXED_NODE_ID = 'fixed-anchor-node';
const DYNAMIC_EDGE_ID = 'edge-fixed-to-active';
const ANIMATION_DURATION = 500;
const TARGET_SLOT_ANGLE = 0;

function cubicBezierEase(t: number): number {
    const p1 = 0.25;
    const p3 = 0.5;
    return 3 * Math.pow(1 - t, 2) * t * p1 + 3 * (1 - t) * Math.pow(t, 2) * p3 + Math.pow(t, 3);
}

export function WorkflowInner() {
    const {ref: containerRef, width: containerWidth, height: containerHeight} = useElementSize();

    const currentHeight = containerHeight || 700;
    const currentWidth = containerWidth || 900;

    // Layout Ratios (4 : 0.5 : 2.5 : 3 => Total 10 parts)
    const sec1Width = currentWidth * (4 / 10);
    const spacerWidth = currentWidth * (0.5 / 10);
    const sec2Width = currentWidth * (2.5 / 10);

    const sec1Center = {
        x: sec1Width / 2,
        y: currentHeight / 2
    };

    const sec2Center = {
        x: sec1Width + spacerWidth + (sec2Width / 2),
        y: currentHeight / 2
    };

    const availableHeight = currentHeight - 40;

    const computedRadius = Math.min(
        sec1Width * 0.38,
        availableHeight * 0.38,
        180
    );

    // --- DYNAMICALLY CALCULATE MOBILE NODE SIZES BASED ON SECTION 2 WIDTH ---
    // Keep the mobile node bounded nicely inside Section 2 with padding
    const dynamicAnchorWidth = Math.min(sec2Width * 0.85, 220);
    const dynamicAnchorHeight = Math.min(availableHeight * 0.85, 440);

    const initialAnchorNode: Node = {
        id: FIXED_NODE_ID,
        type: 'mobileAnchor',
        data: {
            activeNodeId: '2',
            activeNodeLabel: '⚡ Client Store',
            // Pass dynamic bounds down if needed by the node component
            width: dynamicAnchorWidth,
            height: dynamicAnchorHeight,
        },
        position: sec2Center,
        draggable: false,
        selectable: false,
    };

    const [nodes, setNodes] = useNodesState([initialAnchorNode, ...baseNodes]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([
        {
            id: DYNAMIC_EDGE_ID,
            source: FIXED_NODE_ID,
            target: '2',
            type: 'floating',
            animated: true,
            style: {stroke: '#15aabf', strokeWidth: 3},
        },
        ...baseEdges,
    ]);

    const {getNodes, setViewport} = useReactFlow();
    const animFrameIdRef = useRef<number | null>(null);

    const boundsRef = useRef({
        center: {
            minX: sec1Center.x - 40,
            maxX: sec1Center.x + 40,
            minY: sec1Center.y - 40,
            maxY: sec1Center.y + 40,
        },
        satellite: {
            minX: 5,
            maxX: sec1Width - 10,
            minY: 20,
            maxY: currentHeight - 20,
        },
        anchorPos: sec2Center
    });

    useEffect(() => {
        boundsRef.current = {
            center: {
                minX: sec1Center.x - 40,
                maxX: sec1Center.x + 40,
                minY: sec1Center.y - 40,
                maxY: sec1Center.y + 40
            },
            satellite: {
                minX: 5,
                maxX: sec1Width - 10,
                minY: 20,
                maxY: currentHeight - 20
            },
            anchorPos: sec2Center
        };
    }, [sec1Center.x, sec1Center.y, sec1Width, sec2Center.x, sec2Center.y, currentHeight]);

    // Recalculate Node Positions & Dynamic Phone Dimensions on Resize
    useEffect(() => {
        if (!containerWidth || !containerHeight) return;

        setNodes((nds) => {
            const outerNodes = nds.filter((n) => n.id !== CENTER_NODE_ID && n.id !== FIXED_NODE_ID);
            const totalOuter = outerNodes.length;
            const angleStep = (2 * Math.PI) / totalOuter;

            return nds.map((n) => {
                if (n.id === FIXED_NODE_ID) {
                    return {
                        ...n,
                        position: boundsRef.current.anchorPos,
                        data: {
                            ...n.data,
                            width: dynamicAnchorWidth,
                            height: dynamicAnchorHeight,
                        }
                    };
                }

                if (n.id === CENTER_NODE_ID) {
                    return {
                        ...n,
                        position: sec1Center
                    };
                }

                const outerIdx = outerNodes.findIndex((item) => item.id === n.id);
                const angle = outerIdx * angleStep;

                return {
                    ...n,
                    position: {
                        x: Math.round(sec1Center.x + computedRadius * Math.cos(angle)),
                        y: Math.round(sec1Center.y + computedRadius * Math.sin(angle)),
                    },
                };
            });
        });
    }, [containerWidth, containerHeight, sec2Width, availableHeight, setNodes]);

    const clampNodePosition = useCallback((id: string, x: number, y: number) => {
        if (id === FIXED_NODE_ID) {
            return boundsRef.current.anchorPos;
        }

        if (id === CENTER_NODE_ID) {
            const b = boundsRef.current.center;
            return {
                x: Math.max(b.minX, Math.min(b.maxX, x)),
                y: Math.max(b.minY, Math.min(b.maxY, y)),
            };
        }

        const b = boundsRef.current.satellite;
        return {
            x: Math.max(b.minX, Math.min(b.maxX, x)),
            y: Math.max(b.minY, Math.min(b.maxY, y)),
        };
    }, []);

    const handleNodesChange = useCallback(
        (changes: NodeChange<Node>[]) => {
            setNodes((nds) => {
                const nextNodes = applyNodeChanges(changes, nds);
                return nextNodes.map((node) => {
                    if (node.id === FIXED_NODE_ID) return node;

                    const clamped = clampNodePosition(node.id, node.position.x, node.position.y);
                    return {...node, position: clamped};
                });
            });
        },
        [setNodes, clampNodePosition]
    );

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({...params, type: 'floating'}, eds)),
        [setEdges]
    );

    const onNodeMouseEnter = useCallback(
        (_: React.MouseEvent, node: Node) => {
            setEdges((eds) =>
                eds.map((edge) => {
                    if (edge.source === node.id || edge.target === node.id) {
                        return {...edge, animated: true};
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
                return {...edge, animated: false};
            })
        );
    }, [setEdges]);

    const onNodeDrag = useCallback(
        (_: MouseEvent | TouchEvent, node: Node) => {
            if (node.id === FIXED_NODE_ID) return;

            const clamped = clampNodePosition(node.id, node.position.x, node.position.y);

            setNodes((nds) =>
                nds.map((n) => (n.id === node.id ? {...n, position: clamped} : n))
            );
        },
        [setNodes, clampNodePosition]
    );

    const onNodeClick = useCallback(
        (_: React.MouseEvent, clickedNode: Node) => {
            if (clickedNode.id === CENTER_NODE_ID || clickedNode.id === FIXED_NODE_ID) return;

            const clickedConfig = outerNodesConfig.find((item) => item.id === clickedNode.id);
            const activeLabel = clickedConfig ? clickedConfig.label : (clickedNode.data.label as string);

            setNodes((nds) =>
                nds.map((n) =>
                    n.id === FIXED_NODE_ID
                        ? {
                            ...n,
                            data: {
                                ...n.data,
                                activeNodeId: clickedNode.id,
                                activeNodeLabel: activeLabel
                            }
                        }
                        : n
                )
            );

            setEdges((eds) =>
                eds.map((edge) =>
                    edge.id === DYNAMIC_EDGE_ID ? {...edge, target: clickedNode.id} : edge
                )
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

                return {id: node.id, angle, dist};
            });

            nodePositions.sort((a, b) => a.angle - b.angle);

            const totalOuter = nodePositions.length;
            const angleStep = (2 * Math.PI) / totalOuter;

            const clickedIndex = nodePositions.findIndex(({id}) => id === clickedNode.id);
            if (clickedIndex === -1) return;

            const clickedItem = nodePositions[clickedIndex];

            let rotationDelta = TARGET_SLOT_ANGLE - clickedItem.angle;
            rotationDelta = Math.atan2(Math.sin(rotationDelta), Math.cos(rotationDelta));

            if (Math.abs(Math.abs(rotationDelta) - Math.PI) < 0.001) {
                rotationDelta = -Math.PI;
            }

            const animTargets: Record<string, {
                startAngle: number;
                deltaAngle: number;
                startDist: number;
                deltaDist: number
            }> = {};

            nodePositions.forEach(({id, angle, dist}, index) => {
                const relativeIndex = index - clickedIndex;
                const targetAngle = clickedItem.angle + rotationDelta + (relativeIndex * angleStep);

                animTargets[id] = {
                    startAngle: angle,
                    deltaAngle: targetAngle - angle,
                    startDist: dist,
                    deltaDist: computedRadius - dist,
                };
            });

            const startTime = performance.now();

            const animateStep = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
                const eased = cubicBezierEase(progress);

                setNodes((nds) => {
                    let changed = false;
                    const nextNodes = nds.map((n) => {
                        const target = animTargets[n.id];
                        if (!target) return n;

                        changed = true;
                        const currentDist = target.startDist + target.deltaDist * eased;
                        const currentAngle = target.startAngle + target.deltaAngle * eased;

                        return {
                            ...n,
                            position: {
                                x: Math.round(centerX + currentDist * Math.cos(currentAngle)),
                                y: Math.round(centerY + currentDist * Math.sin(currentAngle)),
                            },
                        };
                    });

                    return changed ? nextNodes : nds;
                });

                if (progress < 1) {
                    animFrameIdRef.current = requestAnimationFrame(animateStep);
                }
            };

            animFrameIdRef.current = requestAnimationFrame(animateStep);
        },
        [getNodes, setNodes, setEdges, computedRadius]
    );

    const handleReset = () => {
        setViewport({x: 0, y: 0, zoom: 1}, {duration: 300});
    };

    return (
        <Stack gap="xs" style={{width: '100%', height: '100%'}}>
            <Group justify="space-between" align="center">
                <div>
                    <Title order={3} fw={600}>Workflow Diagram</Title>
                    <Text c="dimmed" size="xs">
                        Fully Dynamic Layout (Ratio: 4 : 0.5 : 2.5 : 3)
                    </Text>
                </div>

                <Button
                    variant="subtle"
                    size="xs"
                    leftSection={<IconRotateDot size={14}/>}
                    onClick={handleReset}
                >
                    Reset View
                </Button>
            </Group>

            <Box
                ref={containerRef}
                style={{
                    height: 'calc(100vh - 100px)',
                    minHeight: '600px',
                    width: '100%',
                    position: 'relative',
                    background: 'transparent',
                }}
            >
                {/* --- VISUAL DEBUG BOUNDARIES LAYER --- */}
                <Box
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                >
                    {/* SECTION 1 BOUNDARY (Flex 4) */}
                    <Box
                        style={{
                            flex: 4,
                            position: 'relative',
                            backgroundColor: 'rgba(34, 139, 230, 0.04)',
                            border: '1.5px dashed #339af0',
                            boxSizing: 'border-box',
                            padding: '4px',
                        }}
                    >
                        <Text fw={700} size="8px" c="blue.7">SEC 1 (4)</Text>

                        {/* Orbit Ring */}
                        <Box
                            style={{
                                position: 'absolute',
                                left: sec1Center.x - computedRadius,
                                top: sec1Center.y - computedRadius,
                                width: computedRadius * 2,
                                height: computedRadius * 2,
                                borderRadius: '50%',
                                border: '1.5px dashed #f06595',
                                backgroundColor: 'rgba(240, 101, 149, 0.02)',
                                pointerEvents: 'none',
                            }}
                        />

                        {/* Center Hub */}
                        <Box
                            style={{
                                position: 'absolute',
                                left: sec1Center.x - 40,
                                top: sec1Center.y - 40,
                                width: 80,
                                height: 80,
                                border: '1.5px dashed #845ef7',
                                backgroundColor: 'rgba(132, 94, 247, 0.08)',
                                borderRadius: '6px',
                                pointerEvents: 'none',
                            }}
                        />
                    </Box>

                    {/* SPACER BOUNDARY (Flex 0.5) */}
                    <Box
                        style={{
                            flex: 0.5,
                            backgroundColor: 'rgba(134, 142, 150, 0.03)',
                            border: '1.5px dashed #868e96',
                            boxSizing: 'border-box',
                            padding: '4px',
                        }}
                    >
                        <Text fw={700} size="8px" c="gray.7">SP (0.5)</Text>
                    </Box>

                    {/* SECTION 2 BOUNDARY (Flex 2.5) */}
                    <Box
                        style={{
                            flex: 2.5,
                            position: 'relative',
                            backgroundColor: 'rgba(18, 184, 134, 0.04)',
                            border: '1.5px dashed #20c997',
                            boxSizing: 'border-box',
                            padding: '4px',
                        }}
                    >
                        <Text fw={700} size="8px" c="teal.7">SEC 2 (2.5)</Text>

                        {/* Dynamically Matched Target Anchor Box Bounds */}
                        <Box
                            style={{
                                position: 'absolute',
                                left: (sec2Width / 2) - (dynamicAnchorWidth / 2),
                                top: (currentHeight / 2) - (dynamicAnchorHeight / 2),
                                width: dynamicAnchorWidth,
                                height: dynamicAnchorHeight,
                                border: '1.5px dashed #12b886',
                                backgroundColor: 'rgba(18, 184, 134, 0.08)',
                                borderRadius: '16px',
                                pointerEvents: 'none',
                            }}
                        />
                    </Box>

                    {/* SECTION 3 BOUNDARY (Flex 3) */}
                    <Box
                        style={{
                            flex: 3,
                            backgroundColor: 'rgba(156, 54, 181, 0.03)',
                            border: '1.5px dashed #cc5de8',
                            boxSizing: 'border-box',
                            padding: '4px',
                        }}
                    >
                        <Text fw={700} size="8px" c="grape.7">SEC 3 (3)</Text>
                    </Box>
                </Box>

                {/* React Flow Canvas */}
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    onNodesChange={handleNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeMouseEnter={onNodeMouseEnter}
                    onNodeMouseLeave={onNodeMouseLeave}
                    onNodeDrag={onNodeDrag}
                    onNodeClick={onNodeClick}
                    nodeOrigin={[0.5, 0.5]}
                    viewport={{x: 0, y: 0, zoom: 1}}
                    fitView={false}
                    panOnDrag={false}
                    panOnScroll={false}
                    zoomOnScroll={false}
                    zoomOnPinch={false}
                    zoomOnDoubleClick={false}
                    selectionOnDrag={false}
                    preventScrolling={true}
                    autoPanOnNodeDrag={false}
                    autoPanOnConnect={false}
                    minZoom={1}
                    maxZoom={1}
                    style={{zIndex: 1, background: 'transparent'}}
                >
                    <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--mantine-color-gray-4)"/>
                </ReactFlow>
            </Box>
        </Stack>
    );
}

export function WorkflowPage() {
    return (
        <ReactFlowProvider>
            <WorkflowInner/>
        </ReactFlowProvider>
    );
}