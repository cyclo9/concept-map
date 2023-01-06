import React, { useEffect, useState } from "react";
import Head from "next/head";
import Node from "../components/node";
import db from "../lib/mongo";

export default function App(results) {
    const data = results.results

    return (
        <div className="App">
            <Head>
                <title>Concept Map</title>
            </Head>

            {data.map((entry) => <Node key={entry.id.toString()} id={entry.id} location={entry.location} label={entry.label} entries={entry.label} tasks={entry.tasks} />)}
        </div>
    );
}

export async function getServerSideProps() {
    const collection = db.collection("nodes");
    const results = await collection.find().toArray();

    return {
        props: {
            results: JSON.parse(JSON.stringify(results))
        }
    }
}