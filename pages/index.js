import React from "react";
import Node from "../components/node";
import Connection from "../components/connection"

let data = [
    { id: 1, x: 50, y: 50 },
    { id: 2, x: 200, y: 200 }
];

export default function App() {
    return (
        <div className="App">
            {data.map((entry) => <Node key={entry.id} id={entry.id} x={entry.x} y={entry.y} />)}
            <Connection id={1} x1={50} y1={50} x2={100} y2={50} />
        </div>
    );
}