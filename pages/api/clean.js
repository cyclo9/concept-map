import db from "@/lib/mongo";

export default async function handler(req, res) {
    const nodes = await db.collection('nodes').find().project({ id: 1, _id: 0 }).toArray()
    const data = await db.collection('data').find().project({ nodeId: 1, _id: 0 }).toArray()
    const tasks = await db.collection('tasks').find().project({ nodeId: 1, _id: 0 }).toArray()

    const dataOutput = []
    for (let i = 0; i < data.length; i++) {
        let status
        for (let j = 0; j < nodes.length; j++) {
            if (data[i].nodeId == nodes[j].id) {
                status = true
                break
            }
        }
        if (!status) dataOutput.push(data[i])
    }
    
    const tasksOutput = []
    for (let i = 0; i < tasks.length; i++) {
        let status
        for (let j = 0; j < nodes.length; j++) {
            if (tasks[i].nodeId == nodes[j].id) {
                status = true
                break
            }
        }
        if (!status) tasksOutput.push(tasks[i])

    }

    res.status(200).json({
        'Data': dataOutput,
        'Tasks': tasksOutput
    })
}