import db from "../../lib/mongo";

export default async function handler(req: any, res: any) {
    interface Response {
        id: string,
        tasks: string[]
    }

    const collection = db.collection("tasks");

    // * ### Read ###
    if (req.method === "GET") {
        const response: Response = req.query;
        const node = await collection.find({ nodeId: response.id }).toArray();
        const tasks = node[0].tasks;
        res.status(200).json(tasks);
    }

    // * ### Create ###
    if (req.method === 'POST') {
        const response: Response = req.body;
        await collection.insertOne({
            nodeId: response.id,
            tasks: []
        })

        res.status(200).json(response)
    }

    // * ### Update ###
    if (req.method === "PUT") {
        const response: Response = req.body;
        
        const filter = {
            nodeId: response.id
        }
        const update = {
            $set: {
                tasks: response.tasks
            }
        }

        await collection.updateOne(filter, update);

        res.status(200).json(response);
    }

    // * ### Delete ###
    if (req.method === "DELETE") {
        const response: Response = req.body;
        await collection.deleteOne({
            nodeId: response.id
        })

        res.status(200).json(response);
    }
}