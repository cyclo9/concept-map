import db from "../../lib/mongo";

export default async function handler(req: any, res: any) {
    const collection: any = db.collection("nodes");

    interface Response {
        id: string,
        location: string,
        label: string,
        color: string,
        entries: any[],
        tasks: any[]
    }

    // * ### Read ###
    if (req.method === "GET") {
        const nodes = await collection.find().toArray();
        res.status(200).json(nodes);
    }

    // * ### Create ###
    if (req.method === "POST") {
        const response: Response = req.body;
        await collection.insertOne({
            id: response.id,
            location: response.location,
            label: response.label,
            color: response.color,
            entries: [],
            tasks: []
        })
        res.status(200).json(response);
    }

    // * ### Update ###
    if (req.method === "PUT") {
        const response: Response = req.body;
        const filter = {
            id: response.id
        }
        const update = {
            $set: {
                location: response.location,
                label: response.label,
                color: response.color
            }
        }
        await collection.updateOne(filter, update);
        res.status(200).json(response);
    }

    // * ### Delete ###
    if (req.method === "DELETE") {
        const response: Response = req.body;
        await collection.deleteOne({
            id: response.id
        })
        res.status(200).json(response);
    }
}