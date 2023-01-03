import React, {useState} from 'react';
import Draggable from 'react-draggable';

function Circle(props) {
    const [id, setId] = useState(props.id);
    const [location, setLocation] = useState([props.x, props.y]);
    let displacement = [];

    // function to update location
    function handleStart(e) {
        displacement = [e.clientX, e.clientY];
    }

    function handleStop(e) {
        displacement = [e.clientX - displacement[0], e.clientY - displacement[1]]
        setLocation([location[0] + displacement[0], location[1] + displacement[1]]);
    }

    // function to send updated location to database


    return (
        <Draggable onStart={handleStart} onStop={handleStop}>
            <circle cx={props.x} cy={props.y} r={props.radius} fill={props.color} />
        </Draggable>
    );
}

export default Circle;