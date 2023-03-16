import db from "@/lib/mongo";

export default async function handler(req, res) {
    const nodes = await db.collection('nodes').find().project({ _id: 0 }).toArray()
    const data = await db.collection('data').find().project({ nodeId: 1, _id: 0 }).toArray()
    const tasks = await db.collection('tasks').find().project({ nodeId: 1, _id: 0 }).toArray()
    const axons = await db.collection('axons').find().project({ _id: 0 }).toArray()

    function idToLabel(id) {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].id == id) return nodes[i].label
        }
    }
    
    // Check for Node duplicates
    const nodeDuplicates = []
    for (let i = 0; i < nodes.length; i++) {
        let counter = 0
        for (let j = 0; j < nodes.length; j++) {
            if (nodes[i].id == nodes[j].id) {
                counter += 1
                if (counter >= 2) {
                    nodeDuplicates.push({
                        id: nodes[i].id,
                        label: nodes[i].label
                    })
                }
            }
        }
    }

    // Check for Data duplicates
    const dataDuplicates = []
    for (let i = 0; i < data.length; i++) {
        let counter = 0
        for (let j = 0; j < data.length; j++) {
            if (data[i].nodeId == data[j].nodeId) {
                counter += 1
                if (counter >= 2) {
                    dataDuplicates.push({
                        nodeId: data[i].nodeId,
                        label: idToLabel(data[i].nodeId)
                    })
                }
            }
        }
    }

    // Check for Task duplicates
    const taskDuplicates = []
    for (let i = 0; i < tasks.length; i++) {
        let counter = 0
        for (let j = 0; j < tasks.length; j++) {
            if (tasks[i].nodeId == tasks[j].nodeId) {
                counter += 1
                if (counter >= 2) {
                    taskDuplicates.push({
                        nodeId: tasks[i].nodeId,
                        label: idToLabel(tasks[i].nodeId)
                    })
                }
            }
        }
    }

    // Check for defected Nodes
    const defectedNodes = []
    for (let i = 0; i < nodes.length; i++) {
        let isDataMatched = false
        let isTaskMatched = false
        for (let j = 0; j < data.length; j++) {
            if (nodes[i].id == data[j].nodeId) isDataMatched = true
        }
        for (let j = 0; j < tasks.length; j++) {
            if (nodes[i].id == tasks[j].nodeId) isTaskMatched = true
        }
        if (!isDataMatched || !isTaskMatched) {
            defectedNodes.push({
                id: nodes[i].id,
                label: nodes[i].label
            })
        }
    }

    // Check for defected data
    const defectedData = []
    for (let i = 0; i < data.length; i++) {
        let isMatched = false
        for (let j = 0; j < nodes.length; j++) {
            if (data[i].nodeId == nodes[j].id) isMatched = true
        }
        if (!isMatched) {
            defectedData.push({
                nodeId: data[i].nodeId,
            })
        }
    }

    // Check for defected tasks
    const defectedTasks = []
    for (let i = 0; i < tasks.length; i++) {
        let isMatched = false
        for (let j = 0; j < nodes.length; j++) {
            if (tasks[i].nodeId == nodes[j].id) isMatched = true
        }
        if (!isMatched) {
            defectedTasks.push({
                nodeId: tasks[i].nodeId,
            })
        }
    }

    const anchors = []
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].category == 'anchor') anchors.push(nodes[i])
    }

    res.status(200).json({
        'STATS': {
            Nodes: {
                Nodes: nodes.length - anchors.length,
                Anchors: anchors.length
            },
            Data: data.length,
            Tasks: tasks.length,
            Axons: axons.length,
            'Avg. Axon/Node': (axons.length / nodes.length).toFixed(3),
            'Duplicates (Nodes)': nodeDuplicates.length,
            'Duplicates (Data)': dataDuplicates.length,
            'Duplicates (Tasks)': taskDuplicates.length,
            'Defected (Nodes)': defectedNodes.length,
            'Defected (Data)': defectedData.length,
            'Defected (Tasks)': defectedTasks.length
        },
        'DUPLICATES (NODES)': nodeDuplicates,
        'DUPLICATES (DATA)': dataDuplicates,
        'DUPLICATES (TASKS)': taskDuplicates,
        'DEFECTED (NODES)': defectedNodes,
        'DEFECTED (DATA)': defectedData,
        'DEFECTED (TASKS)': defectedTasks
    })
}