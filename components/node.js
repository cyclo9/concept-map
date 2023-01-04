import React, { useState } from 'react';
import Draggable from 'react-draggable';
import styles from "../styles/icons.module.css";

export default function Node(props) {
    const id = useState(props.id);
    const [coords, setCoords] = useState({
        x: props.x,
        y: props.y
    });

    function handleDrag(position) {
        let { x, y } = position;
        x = x - 112.5, y = y - 75;
        setCoords({ x, y });
    }

    // function to send updated location to database
    return (
        <div>
            <Draggable position={coords} onDrag={handleDrag}>
                <span className={styles.ellipse}></span>
            </Draggable>
        </div>
    )
}