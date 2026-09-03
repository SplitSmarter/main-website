import {useStore, getBezierPath} from '@xyflow/react';
import type {EdgeProps, InternalNode} from '@xyflow/react';

const FIXED_NODE_ID = 'fixed-anchor-node';

function getNodeIntersection(intersectionNode: InternalNode, targetNode: InternalNode, isVerticalTopConnection = false) {
    const w = intersectionNode.measured.width ?? 0;
    const h = intersectionNode.measured.height ?? 0;
    const targetW = targetNode.measured.width ?? 0;
    const targetH = targetNode.measured.height ?? 0;

    const x = intersectionNode.internals.positionAbsolute.x + w / 2;
    const y = intersectionNode.internals.positionAbsolute.y + h / 2;

    const targetX = targetNode.internals.positionAbsolute.x + targetW / 2;
    const targetY = targetNode.internals.positionAbsolute.y + targetH / 2;

    if (isVerticalTopConnection && intersectionNode.id === FIXED_NODE_ID) {
        return {
            x,
            y: targetY < y ? y - h / 2 : y + h / 2
        };
    }

    const dx = targetX - x;
    const dy = targetY - y;
    const angle = Math.atan2(dy, dx);

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const halfWidth = w / 2;
    const halfHeight = h / 2;

    let edgeX;
    let edgeY;

    if (Math.abs(sin / cos) < halfHeight / halfWidth) {
        edgeX = cos > 0 ? halfWidth : -halfWidth;
        edgeY = edgeX * (dy / dx);
    } else {
        edgeY = sin > 0 ? halfHeight : -halfHeight;
        edgeX = edgeY * (dx / dy);
    }

    return {x: x + edgeX, y: y + edgeY};
}

export function FloatingEdge({id, source, target, style, markerEnd, animated}: EdgeProps) {
    const sourceNode = useStore((s) => s.nodeLookup.get(source));
    const targetNode = useStore((s) => s.nodeLookup.get(target));

    const isVerticalLayout = useStore((s) => {
        const anchor = s.nodeLookup.get(FIXED_NODE_ID);
        if (!anchor) return false;
        const centerNode = s.nodeLookup.get('1');
        if (!centerNode) return false;
        return anchor.internals.positionAbsolute.y > centerNode.internals.positionAbsolute.y + 150;
    });

    useStore((s) => {
        const sNode = s.nodeLookup.get(source);
        const tNode = s.nodeLookup.get(target);
        return `${sNode?.internals.positionAbsolute.x}-${sNode?.internals.positionAbsolute.y}-${tNode?.internals.positionAbsolute.x}-${tNode?.internals.positionAbsolute.y}`;
    });

    if (
        !sourceNode ||
        !targetNode ||
        !sourceNode.measured.width ||
        !sourceNode.measured.height ||
        !targetNode.measured.width ||
        !targetNode.measured.height
    ) {
        return null;
    }

    const sourceIntersection = getNodeIntersection(sourceNode, targetNode, isVerticalLayout);
    const targetIntersection = getNodeIntersection(targetNode, sourceNode, isVerticalLayout);


    const [edgePath] = getBezierPath({
        sourceX: sourceIntersection.x,
        sourceY: sourceIntersection.y,
        targetX: targetIntersection.x,
        targetY: targetIntersection.y,
    });

    return (
        <path
            id={id}
            className={`react-flow__edge-path ${animated ? 'animated' : ''}`}
            d={edgePath}
            markerEnd={markerEnd}
            style={{
                stroke: animated ? 'var(--app-primary, #1c7ed6)' : 'var(--app-border, #ced4da)',
                strokeWidth: animated ? 2.5 : 1.5,
                transition: 'stroke 0.2s ease, stroke-width 0.2s ease',
                ...style,
            }}
        />
    );
}