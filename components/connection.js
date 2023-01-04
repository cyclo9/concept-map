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

    const id = useState();

    const [pointA, setPointA] = useState({
        x: props.x1,
        y: props.y1
    });

    const [pointB, setPointB] = useState({
        x: props.x2,
        y: props.y2
    });

    function handleDragA(position) {
        let { x, y } = position;
        x = x - 15 , y = y - 15;
        setPointA({ x, y });
    }

    function handleDragB(position) {
        let { x, y } = position;
        x = x - 15 , y = y - 15;
        setPointB({ x, y });
    }

    return (
        <div>
            <Draggable position={pointA} onDrag={handleDragA}>
                <span className={styles.endpoint}></span>
            </Draggable>
            <Draggable position={pointB} onDrag={handleDragB}>
                <span className={styles.endpoint}></span>
            </Draggable>
            <Line x0={pointA.x + 12} y0={pointA.y + 12} x1={pointB.x + 12} y1={pointB.y + 12} borderWidth={"2px"} />
        </div>
    )
}