import { useEffect, useState } from "react";
import Neuron from "./neuron";

export default function Layout(props) {
    // ##### SERVER DATA #####
    const nodeData = props.nodeData;
    const connectionData = props.connectionData;

    // ##### Initialize all node data in their corresponding states #####
    const idArray = [];
    nodeData.map((node) => idArray.push(node.id));
    const [id, setId] = useState(idArray);

    const locationArray = [];
    nodeData.map((node) => locationArray.push({ id: node.id, location: node.location }));
    const [location, setLocation] = useState(locationArray);

    const labelArray = [];
    nodeData.map((node) => labelArray.push({ id: node.id, label: node.label }));
    const [label, setLabel] = useState(labelArray);
    
    const entriesArray = [];
    nodeData.map((node) => entriesArray.push({ id: node.id, entries: node.entries }));
    const [entries, setEntries] = useState(entriesArray);

    const tasksArray = [];
    nodeData.map((node) => tasksArray.push({ id: node.id, tasks: node.tasks }));

    // Updates the location of each constantly as it's being dragged
    function handleLocations(data) {
        const update = location;
        let sent = false;
        for (let i = 0; i < update.length; i++) {
            if (data.id == update[i].id) {
                update[i] = data;
                setLocation(update);
                sent = true;
            }
        }
        if (!sent) {
            update.push(data);
            setLocation(update);
        }
    }

    // Connection requires a few things
    // the two nodes that it needs to connect
    // and the array of locations

    return (
        <div>
            {nodeData.map((node) => <Neuron key={node.id} id={node.id} location={node.location} label={node.label} connectionData={connectionData} handleLocations={handleLocations} />)}
        </div>
    )
}