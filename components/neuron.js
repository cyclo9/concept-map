import React, {useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import styles from "../styles/icons.module.css";

export default function Neuron(props) {
    // ##### NODE DATA #####
    const [id, setId] = useState(props.id);
    const [location, setLocation] = useState(props.location);
    const [label, setLabel] = useState(props.label);
    const [entries, setEntries] = useState();
    const [tasks, setTasks] = useState();
    const [connections, setConnection] = useState([]);

    function handleDrag(e, position) {
        const { x, y } = position;

        setLocation({ x, y }) // handles updating it's own location
        props.handleLocations({ id: id, location: { x, y } }) // syncs current location with parent
    }

    async function handleStop(e, position) {
        const { x, y } = position;
        await fetch(`http://localhost:3000/api/nodes/update?id=${id}&location=${JSON.stringify({ x, y })}`);
    }

    return (
        <div>
            <Draggable position={location} onDrag={handleDrag} onStop={handleStop}>
                <span className={[styles.ellipse, id].join(" ")}>
                    <div>{label}</div>
                </span>
            </Draggable>
        </div>
    )
}