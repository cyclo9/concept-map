import { useState, useRef } from "react";
import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

import styles from "./diagram.module.css";
import Popup from "@/components/Popup/Popup.js";
import {
    createNode,
    updateNode,
    deleteNode,
    createAxon,
    updateAxon,
    deleteAxon,
    createDataList,
    createTaskList,
    deleteDataList,
    deleteTaskList
} from "../../lib/api"
import { generateId } from "../../lib/id";

export default function Diagram(props) {
    // * ##### Diagram #####
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
                scrollMode: go.Diagram.InfiniteScroll
            });

        // * ### LINK TEMPLATE ###
        diagram.linkTemplate =
            $(go.Link,
                {
                    relinkableFrom: true, relinkableTo: true,
                    toShortLength: 2,
                    zOrder: -1,
                },
                $(go.Shape, { isPanelMain: true, stroke: "transparent",  strokeWidth: 25 }),
                $(go.Shape, { isPanelMain: true, strokeWidth: 3 }),
                $(go.Shape, { toArrow: 'Standard', scale: 1})
            );

        //*  ### NODE TEMPLATE ###
        diagram.nodeTemplate =
            $(go.Node, "Auto",
                {
                    zOrder: 1
                },
                new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Ellipse",
                    {
                        strokeWidth: 3,
                        width: 180,
                        height: 120,
                        fill: "#ffffff",
                        portId: "",
                        cursor: "pointer",
                        fromLinkable: true, fromLinkableSelfNode: false, fromLinkableDuplicates: false,
                        toLinkable: true, toLinkableSelfNode: false, toLinkableDuplicates: false
                    },
                    new go.Binding("fill", "color")
                ),
                $(go.Panel, "Auto",
                    $(go.TextBlock,
                        {
                            font: "12pt Fira Sans",
                            editable: true,
                            textAlign: "center",
                            verticalAlignment: go.Spot.Center,
                            isMultiline: true,
                            wrap: go.TextBlock.WrapFit,
                            overflow: go.TextBlock.OverflowEllipsis
                        },
                        new go.Binding("text", "label").makeTwoWay()
                    ),
                    $(go.Shape, 'Ellipse',
                        {
                            fill: null,
                            stroke: null,
                            strokeWidth: 2,
                            width: 110,
                            height: 63.5,
                        }),
                ),
                {
                    contextMenu:
                        $("ContextMenu",
                            $("ContextMenuButton",
                                $(go.TextBlock, "Open",
                                    {
                                        margin: 2,
                                        font: "13pt Itim"
                                    }),
                                { click: open }
                            ),
                            $("ContextMenuButton",
                                {
                                    "_buttonFillOver": "#FFFFFF"
                                },
                                $(go.TextBlock, "White",
                                    {
                                        margin: 2,
                                        font: "12pt Itim"
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
                                        font: "12pt Itim"
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
                                        font: "12pt Itim"
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
                                        font: "12pt Itim"
                                    }),
                                { click: changeYellow }
                            ),
                            $("ContextMenuButton",
                                {
                                    "_buttonFillOver": "#8fef8f"
                                },
                                $(go.TextBlock, "Green",
                                    {
                                        margin: 2,
                                        font: "12pt Itim"
                                    }),
                                { click: changeGreen }
                            ),
                            $("ContextMenuButton",
                                {
                                    "_buttonFillOver": "#87cefa"
                                },
                                $(go.TextBlock, "Blue",
                                    {
                                        margin: 2,
                                        font: "12pt Itim"
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
                                        font: "12pt Itim"
                                    }),
                                { click: changePurple }
                            ),
                        )
                }
        )
        
        // * ### OPEN SESAME ###
        function open(e, obj) {
            togglePopup(obj.part.data);
        }

        function changeWhite(e, obj) {
            diagram.commit((d) => {
                const contextMenu = obj.part;
                const node = contextMenu.data;
                d.model.set(node, "color", "#ffffff")
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
                diagram.model.set(node, "color", "#8fef8f")
            })
        }

        function changeBlue(e, obj) {
            diagram.commit((diagram) => {
                const contextMenu = obj.part;
                const node = contextMenu.data;
                diagram.model.set(node, "color", "#87cefa")
            })
        }

        function changePurple(e, obj) {
            diagram.commit((diagram) => {
                const contextMenu = obj.part;
                const node = contextMenu.data;
                diagram.model.set(node, "color", "#bf94e4")
            })
        }
        
        // * ### CONTEXT MENU ###
        diagram.contextMenu =
            $(go.Adornment, "Vertical",
                $("ContextMenuButton",
                    $(go.TextBlock, "Create Node",
                        {
                            margin: 2,
                            font: "14pt Itim"
                        }),
                    { click: addNode })
                // more ContextMenuButtons would go here
            );
    
        function addNode(e, obj) {
            diagram.commit((d) => {
                // create node at cursor
                const node = { label: "New Node" };
                d.model.addNodeData(node);
                const part = d.findPartForData(node);
                part.location = e.diagram.toolManager.contextMenuTool.mouseDownPoint;

                // Update new node's initial properties
                const newNode = d.model.nodeDataArray.slice(-1)[0];
                const newKey = generateId(Math.pow(2, 8))
                
                d.model.set(newNode, "key", newKey);
                d.model.set(newNode, "color", "#ffffff");
            })
        }

        diagram.addDiagramListener("LinkDrawn", (e) => {
            // Generates an ID for the new link
            const newLink = e.diagram.model.linkDataArray.slice(-1)[0]
            e.diagram.model.set(newLink, "key", generateId(Math.pow(2, 8)))
        })
        
        return diagram;
    }
    
    // * ##### Event Handler #####
    // model inserts nodes and links when the page first loads
    const initial = useRef(0); 
    function handleModelChange(changes) {
        if (initial.current) {
            const modifiedNodeData = changes.modifiedNodeData;
            const insertedNodeKeys = changes.insertedNodeKeys;
            const removedNodeKeys = changes.removedNodeKeys;

            const modifiedLinkData = changes.modifiedLinkData;
            const insertedLinkKeys = changes.insertedLinkKeys;
            const removedLinkKeys = changes.removedLinkKeys;

            // * ##### NODES #####
            // Create
            if (insertedNodeKeys != undefined) {
                for (let i = 0; i < modifiedNodeData.length; i++) {
                    const newKey = modifiedNodeData[i].key;
                    const newLocation = modifiedNodeData[i].location;
                    const newLabel = modifiedNodeData[i].label;
                    const color = modifiedNodeData[i].color; // splits each char of the color into an array

                    createNode(newKey, newLocation, newLabel, color);
                    createDataList(newKey)
                    createTaskList(newKey)
                    console.log("+! N:", [modifiedNodeData[i]]);
                }
            }

            // Update
            if (insertedNodeKeys == undefined) {
                if (modifiedNodeData != undefined) {
                    for (let i = 0; i < modifiedNodeData.length; i++) {
                        const key = modifiedNodeData[i].key;
                        const location = modifiedNodeData[i].location;
                        const label = modifiedNodeData[i].label;
                        const color = modifiedNodeData[i].color;
                        
                        updateNode(key, location, label, color);
                        console.log("*! N:", { label: label }, [modifiedNodeData[i]]);
                    }
                }
            }

            // Delete
            if (removedNodeKeys != undefined) {
                for (let i = 0; i < removedNodeKeys.length; i++) {
                    const key = removedNodeKeys[i];

                    deleteNode(key);
                    deleteDataList(key)
                    deleteTaskList(key)
                    console.log("-! N:", { id: key });
                }
            }

            // * ##### AXONS #####
            // Create
            if (insertedLinkKeys != undefined) {
                for (let i = 0; i < insertedLinkKeys.length; i++) {
                    const key = modifiedLinkData[i].key;
                    const from = modifiedLinkData[i].from;
                    const to = modifiedLinkData[i].to;

                    createAxon(key, from, to)
                    console.log("+! A:", { from: from, to: to });
                }
            }

            // Update
            if (insertedLinkKeys == undefined) {
                if (modifiedLinkData != undefined) {
                    const key = modifiedLinkData[0].key.toString()
                    const from = modifiedLinkData[0].from;
                    const to = modifiedLinkData[0].to;

                    updateAxon(key, from, to)
                    console.log("+! A:", { id: key }, { from: from, to: to })
                }
            }

            // Delete
            if (removedLinkKeys != undefined) {
                for (let i = 0; i < removedLinkKeys.length; i++) {
                    const key = removedLinkKeys[i];

                    deleteAxon(key);
                    console.log("-! A:", { id: key });
                }
            }
        } else { initial.current = 1; }
    }

    // * ##### Popup ######
    const [isOpen, setIsOpen] = useState(0);
    const [node, setNode] = useState(null);

    function togglePopup(node) {
        setNode(node);
        setIsOpen(!isOpen);
    }

    return (
        <>
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName={styles.diagram}
                onModelChange={handleModelChange}
                nodeDataArray={props.nodeDataArray}
                linkDataArray={props.linkDataArray}
            />

            {
                isOpen && <Popup
                    handlePopup={togglePopup}
                    node={node}
                />
            }
        </>
    );
}
