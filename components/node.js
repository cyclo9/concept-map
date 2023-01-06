import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import styles from "../styles/icons.module.css";

export default function Node(props) {
    // collects all data from database
    const [data, setData] = useState({
        id: props.id,
        location: props.location,
        label: props.label,
        entries: props.entries,
        tasks: props.tasks
    })

    return (
        <div>
            <Ellipse id={props.id} label={props.label} location={props.location} />
        </div>
    )
}

function Ellipse(props) {
    // Variables
    const id = props.id
    const label = props.label

    // State
    const [location, setLocation] = useState(props.location);

    function handleDrag(e, position) {
        const { x, y } = position;
        setLocation({ x, y });
    }

    async function handleStop(e, position) {
        const { x, y } = position;
        await fetch(`http://localhost:3000/api/nodes/update?id=${props.id}&location=${JSON.stringify({ x, y })}`);
    }

    return (
        <div>
            <Draggable position={location} onDrag={handleDrag} onStop={handleStop}>
                <span className={styles.ellipse}>
                    <div>{props.label}</div>
                </span>
            </Draggable>
        </div>
    )
}