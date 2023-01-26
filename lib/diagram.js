import * as go from "gojs";

export function initDiagram() {
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
                $(go.Shape, { isPanelMain: true, stroke: "transparent" , strokeWidth: 25 }),
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
                                { click: open }
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
            
        function open(e, obj) {
            console.log("Open Sesame")
        }

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