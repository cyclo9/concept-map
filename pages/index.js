import Head from "next/head";
import { useState } from "react";

import Login from '@/components/Login/Login.js'
import db from "@/lib/mongo";
import Diagram from "@/components/Diagram/Diagram.js";

// * ##### DATA FETCHING #####
export async function getServerSideProps() {
    const nodes = await db.collection("nodes").find().toArray();
    const axons = await db.collection("axons").find().toArray();
    const _ = await db.collection('_').find().toArray();

    return {
        props: {
            nodes: JSON.parse(JSON.stringify(nodes)),
            axons: JSON.parse(JSON.stringify(axons)),
            _: JSON.parse(JSON.stringify(_)),
        }
    }
}

export default function App(props) {
    // * ##### Node & Axon #####
    const nodeData = [];
    const axonData = [];
    const _ = props._[0]._
    props.nodes.map(node => nodeData.push({ key: node.id, location: node.location, label: node.label, color: node.color }))
    props.axons.map(axon => axonData.push({ key: axon.id, from: axon.from, to: axon.to }));

    const [status, setStatus] = useState(false)
    
    return (
        <div className="App">
            <Head>
                <title>Interactive Knowledge Graph</title>
            </Head>

            {
                !status ? <Diagram
                    nodeDataArray={nodeData}
                    linkDataArray={axonData}
                /> : <Login setStatus={setStatus} _={_} />
            }
        </div>
    );
}