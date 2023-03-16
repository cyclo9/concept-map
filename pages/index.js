import Head from "next/head";
import { useState, useEffect } from "react";
import useSWR from 'swr'

import Login from '@/components/Login/Login.js'
import Diagram from "@/components/Diagram/Diagram.js";

export default function App() {
    // * ### Data Fetching ###
    const fetcher = url => fetch(url).then(res => res.json())
    function fetchData(url) {
        const { data, error, isLoading } = useSWR(url, fetcher)

        return {
            data: data,
            isLoading,
            isError: error
        }
    }

    // * Node & Axon
    const nodes = fetchData(`/api/nodes`)
    const axons = fetchData(`/api/axons`)

    const nodesArray = []
    const axonArray = []

    const [nodeData, setNodes] = useState([])
    const [axonData, setAxons] = useState([])

    useEffect(() => {
        if (nodes.data != undefined) {
            nodes.data.map(node => nodesArray.push({
                key: node.id,
                location: node.location,
                label: node.label,
                color: node.color,
                category: node.category
            }))
            setNodes(nodesArray)
        }
        if (axons.data != undefined) {
            axons.data.map(axon => axonArray.push({
                key: axon.id,
                from: axon.from,
                to: axon.to
            }))
            setAxons(axonArray)
        }
    }, [nodes.isLoading, axons.isLoading])

    // * Authentication
    const [status, setStatus] = useState(false)
    const _ = fetchData(`/api/_`).data

    return (
        <div className="App">
            <Head>
                <title>Interactive Knowledge Graph</title>
            </Head>

            {
                status ? <Diagram
                    nodeDataArray={nodeData}
                    linkDataArray={axonData}
                /> : <Login setStatus={setStatus} _={_} />
            }
        </div>
    );
}