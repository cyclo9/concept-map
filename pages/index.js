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
            initialAutoScale: go.Diagram.None,
        });

    // ### LINK TEMPLATE
    diagram.linkTemplate =
        $(go.Link,
            {
                relinkableFrom: true, relinkableTo: true
            },
            $(go.Shape, { isPanelMain: true, stroke: "transparent", strokeWidth: 15 }),
            $(go.Shape, { isPanelMain: true, strokeWidth: 3 }),
        );

    // ### NODE TEMPLATE ###
    diagram.nodeTemplate =
        $(go.Node, "Auto",
            new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "Ellipse",
                {
                    strokeWidth: 3,
                    fill: "white",
                    width: 135,
                    height: 90,
                    portId: "",
                    cursor: "pointer",
                    fromLinkable: true, fromLinkableSelfNode: false, fromLinkableDuplicates: false,
                    toLinkable: true, toLinkableSelfNode: false, toLinkableDuplicates: false
                },
                new go.Binding("fill", "color")
            ),
            $(go.Panel, "Vertical",
                $(go.TextBlock,
                    {
                        font: "18px Comic Sans MS",
                        width: 90,
                        editable: true,
                        textAlign: "center",
                        verticalAlignment: go.Spot.Center,
                        isMultiline: true,
                        wrap: go.TextBlock.WrapFit
                    },
                    new go.Binding("text", "label").makeTwoWay()
                )
            ),
            {
                contextMenu:
                    $("ContextMenu",
                        $("ContextMenuButton",
                            $(go.TextBlock, "OPEN",
                                {
                                    margin: 2,
                                    font: "bold 16px Trebuchet MS"
                                }),
                            {}
                        ),
                        $("ContextMenuButton",
                            $(go.TextBlock, "White",
                                {
                                    margin: 2,
                                    font: "12px Comic Sans MS"
                                }),
                            { click: changeWhite }
                        ),
                        $("ContextMenuButton",
                            {
                                "_buttonFillOver": "#ff8888",
                            },
                            $(go.TextBlock, "Red",
                                {
                                    margin: 2,
                                    font: "12px Comic Sans MS"
                                }),
                            { click: changeRed }
                        ),
                        $("ContextMenuButton",
                            {
                                "_buttonFillOver": "#ffc87c",
                            },
                            $(go.TextBlock, "Orange",
                                {
                                    margin: 2,
                                    font: "12px Comic Sans MS"
                                }),
                            { click: changeOrange }
                        ),
                        $("ContextMenuButton",
                            {
                                "_buttonFillOver": "#fcffa4"
                            },
                            $(go.TextBlock, "Yellow",
                                {
                                    margin: 2,
                                    font: "12px Comic Sans MS"
                                }),
                            { click: changeYellow }
                        ),
                        $("ContextMenuButton",
                            {
                                "_buttonFillOver": "lightgreen"
                            },
                            $(go.TextBlock, "Green",
                                {
                                    margin: 2,
                                    font: "12px Comic Sans MS"
                                }),
                            { click: changeGreen }
                        ),
                        $("ContextMenuButton",
                            {
                                "_buttonFillOver": "lightblue"
                            },
                            $(go.TextBlock, "Blue",
                                {
                                    margin: 2,
                                    font: "12px Comic Sans MS"
                                }),
                            { click: changeBlue }
                        ),
                        $("ContextMenuButton",
                            {
                                "_buttonFillOver": "#bf94e4"
                            },
                            $(go.TextBlock, "Purple",
                                {
                                    margin: 2,
                                    font: "12px Comic Sans MS"
                                }),
                            { click: changePurple }
                        ),
                    )
            }
        )
        
    function changeWhite(e, obj) {
        diagram.commit((d) => {
            const contextMenu = obj.part;
            const node = contextMenu.data;
            d.model.set(node, "color", "white")
        })
    }

    function changeRed(e, obj) {
        diagram.commit((d) => {
            const contextMenu = obj.part;
            const node = contextMenu.data;
            d.model.set(node, "color", "#ff8888")
        })
    }

    function changeOrange(e, obj) {
        diagram.commit((d) => {
            const contextMenu = obj.part;
            const node = contextMenu.data;
            d.model.set(node, "color", "#ffc87c")
        })
    }

    function changeYellow(e, obj) {
        diagram.commit((diagram) => {
            const contextMenu = obj.part;
            const node = contextMenu.data;
            diagram.model.set(node, "color", "#fcffa4")
        })
    }

    function changeGreen(e, obj) {
        diagram.commit((diagram) => {
            const contextMenu = obj.part;
            const node = contextMenu.data;
            diagram.model.set(node, "color", "lightgreen")
        })
    }

    function changeBlue(e, obj) {
        diagram.commit((diagram) => {
            const contextMenu = obj.part;
            const node = contextMenu.data;
            diagram.model.set(node, "color", "lightskyblue")
        })
    }

    function changePurple(e, obj) {
        diagram.commit((diagram) => {
            const contextMenu = obj.part;
            const node = contextMenu.data;
            diagram.model.set(node, "color", "#bf94e4")
        })
    }
    
    // ### CONTEXT MENU ###
    function addNode(e, obj) {
        diagram.commit((d) => {
            // Node Creation
            const node = { label: "New Node" };
            d.model.addNodeData(node);
            const part = d.findPartForData(node);
            part.location = e.diagram.toolManager.contextMenuTool.mouseDownPoint;

            // Update new node's initial properties
            const newNode = d.model.nodeDataArray.slice(-1)[0];
            const newKey = "node" + newNode.key.toString();
            const newLabel = "Node" + newNode.key.toString();
            
            d.model.setDataProperty(newNode, "key", newKey);
            d.model.setDataProperty(newNode, "label", newLabel);
            d.model.setDataProperty(newNode, "color", "white");
        })        
    }

    diagram.contextMenu =
        $(go.Adornment, "Vertical",
            $("ContextMenuButton",
                {
                    "_buttonFillOver": "lightgreen"
                },
                $(go.TextBlock, "Create Neuron",
                    {
                        margin: 5,
                        font: "16px Trebuchet MS"
                }),
                { click: addNode })
            // more ContextMenuButtons would go here
        ); 
    
    return diagram;
}

// ##### API ROUTES #####
    // Nodes
async function createNode(id, location, label, color) {
    await fetch(`http://localhost:3000/api/node/create?id=${id}&location=${location}&label=${label}&color=${color}`);
}

async function updateNode(id, location, label, color) {
    await fetch(`http://localhost:3000/api/node/update?id=${id}&location=${location}&label=${label}&color=${color}`);
}

async function deleteNode(id) {
    await fetch(`http://localhost:3000/api/node/delete?id=${id}`);
}
    // Axons
async function createAxon(id, from, to) {
    await fetch(`http://localhost:3000/api/axon/create?id=${id}&from=${from}&to=${to}`);
}

async function updateAxon(id, from, to) {
    await fetch(`http://localhost:3000/api/axon/update?id=${id}&from=${from}&to=${to}`);
}

async function deleteAxon(id) {
    await fetch(`http://localhost:3000/api/axon/delete?id=${id}`); 
}

function generateKey(key) {
    if (typeof (key) != "string") {
        return "axon" + key.toString()
    } else {
        return key
    }
}

function colorToString(color) {
    let colorAsString = [];
    color.forEach(char => {
        if (char == "#") {
            colorAsString.push("%23") // '%23' is the percent encoding for a hash '#'
        } else {
            colorAsString.push(char)
        }
    });
    return colorAsString.join("")
}

let initial = true; // Prevents any changes from being registered the first the diagram is loaded
function handleModelChange(changes) {
    if (!initial) {
        const modifiedNodeData = changes.modifiedNodeData;
        const insertedNodeKeys = changes.insertedNodeKeys;
        const removedNodeKeys = changes.removedNodeKeys;

        const modifiedLinkData = changes.modifiedLinkData;
        const insertedLinkKeys = changes.insertedLinkKeys;
        const removedLinkKeys = changes.removedLinkKeys;

        // ##### NODES #####
            // Create
        if (insertedNodeKeys != undefined) {
            for (let i = 0; i < modifiedNodeData.length; i++) {
                const newKey = modifiedNodeData[i].key;
                const newLocation = modifiedNodeData[i].location;
                const newLabel = modifiedNodeData[i].label;
                const color = colorToString(modifiedNodeData[i].color.split("")); // splits each char of the color into an array

                createNode(newKey, newLocation, newLabel, color);
                console.log("Created Node:", newKey);
            }
        }

            // Update
        if (insertedNodeKeys == undefined) {
            if (modifiedNodeData != undefined) {
                for (let i = 0; i < modifiedNodeData.length; i++) {
                    const key = modifiedNodeData[i].key;
                    const location = modifiedNodeData[i].location;
                    const label = modifiedNodeData[i].label;
                    const color = colorToString(modifiedNodeData[i].color.split("")); // splits each char of the color into an array
                    
                    updateNode(key, location, label, color);
                    console.log("Updated Node:", label, [modifiedNodeData[i]]);
                }
            }
        }

            // Delete
        if (removedNodeKeys != undefined) {
            for (let i = 0; i < removedNodeKeys.length; i++) {
                const key = generateKey(removedNodeKeys[i]);

                deleteNode(key);
                console.log("Deleted Node:", key);
            }
        }

        // ##### AXONS #####
            // Create
        if (insertedLinkKeys != undefined) {
            for (let i = 0; i < insertedLinkKeys.length; i++) {
                const key = generateKey(insertedLinkKeys[i]);
                const from = modifiedLinkData[i].from;
                const to = modifiedLinkData[i].to;

                createAxon(key, from, to)
                console.log("Created Axon:", key, {from: from, to: to});
            }
        }

            // Update
        if (insertedLinkKeys == undefined) {
            if (modifiedLinkData != undefined) {
                const key = modifiedLinkData[0].key.toString()
                const from = modifiedLinkData[0].from;
                const to = modifiedLinkData[0].to;

                updateAxon(key, from, to)
                console.log("Updated Axon:", key, {from: from, to: to})
            }
        }

            // Delete
        if (removedLinkKeys != undefined) {
            for (let i = 0; i < removedLinkKeys.length; i++) {
                const key = generateKey(removedLinkKeys[i]);

                deleteAxon(key);
                console.log("Deleted Axon:", key);
            }
        }
    } else { initial = false; }
}

export default function App(props) {
    const nodes = props.nodes;
    const axons = props.axons;

    const nodeData = [];
    const axonData = [];

    nodes.map((node) => nodeData.push({ key: node.id, location: node.location, label: node.label, color: node.color}))
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