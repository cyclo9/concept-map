import React from "react";
import Circle from "../components/circle"
import Draggable from "react-draggable";

let data = [
    { id: 1, x: 50, y: 50, radius: 15, color: "black" },
    { id: 2, x: 100, y: 100, radius: 15, color: "black" }
];

// Renders all nodes
function NodeLayout() {
    return (
        <svg width="100vw" height="100vh">
            {data.map((entry) => <Circle id={entry.id} x={entry.x} y={entry.y} radius={entry.radius} color={entry.color} />)}
        </svg>
    );
}

export default function App() {
    return (
        <div className="App">
            <NodeLayout />
        </div>
    );
}