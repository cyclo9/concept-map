import { useEffect, useState } from "react";
import Head from "next/head";
import db from "../lib/mongo";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import styles from "../styles/app.module.css";

// ##### DATA FETCHING #####
export async function getServerSideProps() {

    const nodeResults = await db.collection("nodes").find().toArray();
    const axonResults = await db.collection("axons").find().toArray();

    return {
        props: {
            nodes: JSON.parse(JSON.stringify(nodeResults)),
            axons: JSON.parse(JSON.stringify(axonResults))
        }
    }
}

// ##### DIAGRAM CODE #####
function initDiagram() {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram,
        {
            "undoManager.isEnabled": true,
            model: new go.GraphLinksModel({
                linkKeyProperty: "key"
            }),
            initialPosition: go.Point.parse("0 0"),
            initialAutoScale: go.Diagram.Uniform,
    });
    // ### NODE TEMPLATE ###
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
                new go.Binding("text", "label"),
                {
                    font: "16px Comic Sans MS"
            })
        );
    // ### LINK TEMPLATE
    diagram.linkTemplate =
        $(go.Link,
            $(go.Shape,
                {
                    strokeWidth: 3
                }
            )
        );
    // ### CONTEXT MENU ###
    function addNode(e, obj) {
        // Node Creation
        const node = { label: "New Node" };
        diagram.model.addNodeData(node);
        const part = diagram.findPartForData(node);
        part.location = e.diagram.toolManager.contextMenuTool.mouseDownPoint;

        // Update new node's initial properties
        const newNode = diagram.model.nodeDataArray.slice(-1)[0]
        const newKey = "node" + newNode.key.toString()
        diagram.model.setDataProperty(newNode, "key", newKey)

        // Update Database
        createNode(newNode.key, newNode.location, newNode.label);
        console.log(newNode.key, newNode.location, newNode.label);
    }

    diagram.contextMenu =
        $(go.Adornment, "Vertical",
            $("ContextMenuButton",
                $(go.TextBlock, "Add Neuron",
                    {
                        margin: 5,
                        font: "16px Comic Sans MS"
                }),
                { click: addNode })
            // more ContextMenuButtons would go here
        ); 
    
    return diagram;
}

// ##### API ROUTES #####
async function updateNodeLocation(id, location) {
    await fetch(`http://localhost:3000/api/node/updateLocation?id=${id}&location=${location}`);
}

async function createNode(id, location, label) {
    await fetch(`http://localhost:3000/api/node/createNode?id=${id}&location=${location}&label=${label}`);
}

// ##### CRUD LOGIC #####
let initial = true; // Prevents any changes from being registered the first the diagram is loaded
function handleModelChange(changes) {
    if (!initial) {
        const modifiedNodeData = changes.modifiedNodeData;

        // ### UPDATE NODE LOCATION ###
        if (modifiedNodeData != undefined) {
            for (let i = 0; i < modifiedNodeData.length; i++) {
                let key = modifiedNodeData[i].key;
                let location = modifiedNodeData[i].location;

                updateNodeLocation(key, location);
            }
        }

        console.log("Changes:", changes)
    } else { initial = false; }
}

export default function App(props) {
    const nodes = props.nodes;
    const axons = props.axons;

    const nodeData = [];
    nodes.map((node) => nodeData.push({ key: node.id, label: node.label, location: node.location }))

    const axonData = [];
    axons.map((axon) => axonData.push({ key: axon.id, from: axon.from, to: axon.to }));

    return (
        <div className="App">
            <Head>
                <title>Concept Map</title>
            </Head>

            <ReactDiagram
                initDiagram={initDiagram}
                divClassName={styles.diagram}
                nodeDataArray={nodeData}
                linkDataArray={axonData}
                onModelChange={handleModelChange}
            />
        </div>
    );
}