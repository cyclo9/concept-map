import db from "../../lib/mongo";

export default async function handler(req: any, res: any) {
    interface Response {
        id: string,
        tasks: string[]
    }

    const collection = db.collection("nodes");

    // * ### Read ###
    if (req.method === "GET") {
        const response: Response = req.query;
        const node = await collection.find({ id: response.id }).toArray();
        const tasks = node[0].tasks;
        res.status(200).json(tasks);
    }

    // * ### Update ###
    if (req.method === "PUT") {
        const response: Response = req.body;
        
        const filter = {
            id: response.id
        }
        const update = {
            $set: {
                tasks: response.tasks
            }
        }

        await collection.updateOne(filter, update);

        res.status(200).json(response);
    }
}