import React, { useEffect } from "react";
import Node from "../components/node";
import clientPromise from "../lib/mongodb";
import Connection from "../components/connection"

let nodes = [
    { id: 1, x: 200, y: 50 },
    { id: 2, x: 200, y: 250 }
];

let connections = [
    { id: 1, x1: nodes[0].x, y1: nodes[0].y, x2: nodes[1].x, y2: nodes[1].y}
]

export async function getServerSideProps() {
    try {
        const filter = {
        };

        const client = await clientPromise
        const collection = client.db("data").collection("nodes");
        const cursor = collection.find(filter);
        const results = await cursor.toArray();

        return {
            props: {
                results: JSON.parse(JSON.stringify(results))
            }
        };
    } catch (e) {
        console.error(e)
    }
}

export default function App(results) {
    useEffect(() => {
        console.log(results.results);
    })

    return (
        <div className="App">
            {connections.map((connection) => <Connection key={connection.id} id={connection.id} x1={connection.x1} y1={connection.y1} x2={connection.x2} y2={connection.y2} />)}
            {nodes.map((node) => <Node key={node.id} id={node.id} x={node.x} y={node.y} />)}
        </div>
    );
}