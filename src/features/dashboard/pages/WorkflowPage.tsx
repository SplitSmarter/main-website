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
import {
    initialNodes as baseNodes,
    initialEdges as baseEdges,
    outerNodesConfig
} from '@/features/workflow/config/flowData';
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
const BREAKPOINT_WIDTH = 850;

function cubicBezierEase(t: number): number {
    const p1 = 0.25;
    const p3 = 0.5;
    return 3 * Math.pow(1 - t, 2) * t * p1 + 3 * (1 - t) * Math.pow(t, 2) * p3 + Math.pow(t, 3);
}

export function WorkflowInner() {
    const {ref: containerRef, width: containerWidth, height: containerHeight} = useElementSize();

    const currentHeight = containerHeight || 700;
    const currentWidth = containerWidth || 900;
    const isVertical = currentWidth < BREAKPOINT_WIDTH;

    const sec1Width = isVertical ? currentWidth : currentWidth * (4 / 10);
    const spacerWidth = isVertical ? 0 : currentWidth * (0.5 / 10);
    const sec2Width = isVertical ? currentWidth : currentWidth * (2.5 / 10);

    const sec1Height = isVertical ? currentHeight * 0.55 : currentHeight;
    const sec2Height = isVertical ? currentHeight * 0.45 : currentHeight;

    const sec1Center = {
        x: sec1Width / 2,
        y: sec1Height / 2
    };

    const sec2Center = isVertical
        ? {x: sec2Width / 2, y: sec1Height + (sec2Height / 2)}
        : {x: sec1Width + spacerWidth + (sec2Width / 2), y: currentHeight / 2};

    const availableHeight = sec1Height - 40;

    const computedRadius = Math.min(
        sec1Width * 0.38,
        availableHeight * 0.38,
        160
    );

    const dynamicAnchorWidth = Math.min(sec2Width * 0.85, 220);
    const dynamicAnchorHeight = Math.min(sec2Height * 0.85, 420);

    const initialAnchorNode: Node = {
        id: FIXED_NODE_ID,
        type: 'mobileAnchor',
        data: {
            activeNodeId: '2',
            activeNodeLabel: '⚡ Client Store',
            width: dynamicAnchorWidth,
            height: dynamicAnchorHeight,
            isVertical: isVertical,
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
    const lastLayoutModeRef = useRef<boolean>(isVertical);
    const lastDimensionsRef = useRef({w: currentWidth, h: currentHeight});

    const boundsRef = useRef({
        center: {
            minX: sec1Center.x - 40,
            maxX: sec1Center.x + 40,
            minY: sec1Center.y - 40,
            maxY: sec1Center.y + 40,
        },
        satellite: {
            minX: 10,
            maxX: sec1Width - 10,
            minY: 20,
            maxY: sec1Height - 20,
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
                minX: 10,
                maxX: sec1Width - 10,
                minY: 20,
                maxY: sec1Height - 20
            },
            anchorPos: sec2Center
        };
    }, [sec1Center.x, sec1Center.y, sec1Width, sec1Height, sec2Center.x, sec2Center.y]);

    // Inside WorkflowInner.tsx, update your resize useEffect:
    useEffect(() => {
        if (!containerWidth || !containerHeight) return;

        const widthDiff = Math.abs(containerWidth - lastDimensionsRef.current.w);
        const heightDiff = Math.abs(containerHeight - lastDimensionsRef.current.h);
        const modeChanged = lastLayoutModeRef.current !== isVertical;

        if (!modeChanged && widthDiff < 15 && heightDiff < 15) return;

        lastLayoutModeRef.current = isVertical;
        lastDimensionsRef.current = {w: containerWidth, h: containerHeight};

        setNodes((nds) => {
            const outerNodes = nds.filter((n) => n.id !== CENTER_NODE_ID && n.id !== FIXED_NODE_ID);
            const totalOuter = outerNodes.length;
            const angleStep = (2 * Math.PI) / totalOuter;

            return nds.map((n) => {
                if (n.id === FIXED_NODE_ID) {
                    return {
                        ...n,
                        position: sec2Center,
                        data: {
                            ...n.data,
                            width: dynamicAnchorWidth,
                            height: dynamicAnchorHeight,
                            isVertical: isVertical,
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
                const angle = outerIdx !== -1 ? outerIdx * angleStep : 0;

                return {
                    ...n,
                    position: {
                        x: Math.round(sec1Center.x + computedRadius * Math.cos(angle)),
                        y: Math.round(sec1Center.y + computedRadius * Math.sin(angle)),
                    },
                };
            });
        });

        // FIX: When switching layout modes, update the dynamic edge target to match the correct node orientation
        if (modeChanged) {
            setEdges((eds) =>
                eds.map((edge) => {
                    if (edge.id === DYNAMIC_EDGE_ID) {
                        // In vertical mode, point to the top-most node or center node depending on your layout design.
                        // If your vertical layout stack puts a specific node on top, target that ID (e.g., CENTER_NODE_ID or the top outer node).
                        const newTarget = isVertical ? CENTER_NODE_ID : '2';
                        return {...edge, target: newTarget};
                    }
                    return edge;
                })
            );
        }
    }, [containerWidth, containerHeight, isVertical, sec1Center, sec2Center, computedRadius, dynamicAnchorWidth, dynamicAnchorHeight, setNodes, setEdges]);

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

            // FIX: If vertical, align the active node to point downwards (Math.PI / 2), otherwise point to the right (0)
            const targetSlotAngle = isVertical ? Math.PI / 2 : 0;

            let rotationDelta = targetSlotAngle - clickedItem.angle;
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
        [getNodes, setNodes, setEdges, computedRadius, isVertical]
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
                        {isVertical ? 'Vertical Stack Layout (Small Screen)' : 'Fully Dynamic Layout'}
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
                    panOnDrag={false}              // Disables background panning
                    nodesConnectable={false}       // Disables connection handles on nodes
                    zoomOnScroll={false}           // Disables zooming via mouse wheel
                    zoomOnPinch={false}            // Disables pinch-to-zoom on mobile/trackpad
                    zoomOnDoubleClick={false}      // Disables double-click zoom
                    selectionOnDrag={false}        // Disables click-and-drag selection box
                    preventScrolling={false}       // Crucial: Allows normal page scrolling when hovering over the flow
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