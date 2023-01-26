import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/app.module.css";

import db from "../lib/mongo";
import { ReactDiagram } from "gojs-react";
import { initDiagram } from "../lib/diagram";
import { createNode, updateNode, deleteNode, createAxon, updateAxon, deleteAxon } from "./api/routes";
import { generateKey, colorToString } from "../lib/properties";


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

export default function App(props) {
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

    const nodes = props.nodes;
    const axons = props.axons;

    const nodeData = [];
    const axonData = [];

    nodes.map((node) => nodeData.push({ key: node.id, location: node.location, label: node.label, color: node.color}))
    axons.map((axon) => axonData.push({ key: axon.id, from: axon.from, to: axon.to }));
    
    return (
        <div className="App">
            <Head>
                <title>Interactive Knowledge Graph</title>
            </Head>

            <ReactDiagram
                initDiagram={initDiagram}
                divClassName={styles.diagram}
                nodeDataArray={nodeData}
                linkDataArray={axonData}
                onModelChange={handleModelChange}
            />
            <div className={styles.superposition}>
                <div className={styles.popup}>
                    
                </div>
            </div>
        </div>
    );
}