import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/layout"
import db from "../lib/mongo";

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


export default function App(props) {
    const connections = [
        { id:"connection-1", from: "node-1", "to": "node-2" }
    ]

    return (
        <div className="App">
            <Head>
                <title>Concept Map</title>
            </Head>

            <Layout nodeData={props.nodes} connectionData={connections} />
        </div>
    );
}