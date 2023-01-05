import React, { useState } from 'react';
import Draggable from 'react-draggable';
import styles from "../styles/icons.module.css";

export default function Node(props) {
    const id = useState(props.id);
    const [coords, setCoords] = useState({
        x: props.x,
        y: props.y
    });

    function handleDrag(e, position) {
        let { x, y } = position;
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