import { useState, useEffect, useRef, createContext, memo} from "react";
import Head from "next/head";
import db from "../lib/mongo";

import Diagram from "../components/Diagram";

// * ##### DATA FETCHING #####
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

export const NodeDataContext = createContext(null)

export default function App(props) {
    // * ##### Node & Axon #####
    const nodeData = [];
    const axonData = [];
    props.nodes.map(node => nodeData.push({ key: node.id, location: node.location, label: node.label, color: node.color, entries: node.entries, tasks: node.tasks }))
    props.axons.map(axon => axonData.push({ key: axon.id, from: axon.from, to: axon.to }));

    return (
        <div className="App">
            <Head>
                <title>Interactive Knowledge Graph</title>
            </Head>

            <div>
                <Diagram
                    nodeDataArray={nodeData}
                    linkDataArray={axonData}
                />
            </div>
        </div>
    );
}