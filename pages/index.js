import { useEffect, useState } from "react";
import Head from "next/head";
import db from "../lib/mongo";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import styles from "../styles/app.module.css";

// ##### DATA FETCHING #####

export async function getServerSideProps() {

    const nodeResults = await db.collection("nodes").find().toArray();
    const connectionResults = await db.collection("connections").find().toArray();

    return {
        props: {
            nodes: JSON.parse(JSON.stringify(nodeResults)),
            connections: JSON.parse(JSON.stringify(connectionResults))
        }
    }
}

// ##### DIAGRAM CODE #####

function initDiagram() {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, {
        "undoManager.isEnabled": true,
        model: new go.GraphLinksModel({
            linkKeyProperty: "key"
        })
    });

    diagram.nodeTemplate =
        $(go.Node, "Auto",
            new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "Ellipse",
                {
                    strokeWidth: 3,
                    fill: "white",
                    width: 135,
                    height: 90
                }),
            $(go.TextBlock,
                new go.Binding("text"))
        );
    
    diagram.linkTemplate =
        $(go.Link,
            $(go.Shape,
                {
                    strokeWidth: 3
                }
            )
        );
    
    diagram.model.addChangedListener((e) => {
        if (e.propertyName === "CommittedTransaction") {
            // console.log(e.model.nodeDataArray);
        }
    })
    
    return diagram;
}

// ##### APP LOGIC #####

async function updateNeuron() {
    await fetch(`http://localhost:3000/api/nodes/update?id=${id}&location=${JSON.stringify({ x, y })}`);
}


function handleModelChange(changes) {
    // here is where you would make any updates to your React state
    console.log(changes);
}

export default function App(props) {
    const nodes = props.nodes;
    const connections = props.connections;

    const nodeData = [];
    nodes.map((node) => nodeData.push({ key: node.id, text: node.label, location: node.location }))
    const [nodeArray, setNodeData] = useState(nodeData);

    const connectionData = [];
    connections.map((connection) => connectionData.push({ key: connection.id, from: connection.from, to: connection.to }));
    const [connectionArray, setConnectionArray] = useState(connectionData);

    return (
        <div className="App">
            <Head>
                <title>Concept Map</title>
            </Head>

            <ReactDiagram
                initDiagram={initDiagram}
                divClassName={styles.diagram}
                nodeDataArray={nodeArray}
                linkDataArray={connectionArray}
                onModelChange={handleModelChange}
            />
        </div>
    );
}