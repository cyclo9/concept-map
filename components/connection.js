import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import styles from "../styles/icons.module.css";
import dynamic from 'next/dynamic';

/**
 * When the line moves, the endpoint moves (onDrag)
 * When the endpoint moves, the line moves (onDrag)
 */

export default function Connection(props) {
    const Line = dynamic(() => import("react-lineto").then((mod) => mod.Line), {
        ssr: false,
      })

    const [lineWidth, setLineWidth] = useState(5);
    const [offsetX, setOffsetX] = useState(112.5);
    const [offsetY, setOFfsetY] = useState(75);
    const [lineOffSet, setLineOffSet] = useState(8 + lineWidth);

    const [pointA, setPointA] = useState({
        x: props.x1 + offsetX,
        y: props.y1 + offsetY
    });

    const [pointB, setPointB] = useState({
        x: props.x2 + offsetX,
        y: props.y2 + offsetY
    });

    return (
        <div>
            <Line x0={pointA.x + lineOffSet} y0={pointA.y + lineOffSet} x1={pointB.x + lineOffSet} y1={pointB.y + lineOffSet} borderWidth={lineWidth} />
        </div>
    )
}