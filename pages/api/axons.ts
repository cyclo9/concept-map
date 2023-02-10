import db from "../../lib/mongo";

export default async function handler(req: any, res: any) {
    const collection: any = db.collection("axons");

    interface Response {
        id: string,
        from: string,
        to: string
    }

    // * ### Create ###
    if (req.method === "POST") {
        const response: Response = req.body;
        await collection.insertOne({
            id: response.id,
            from: response.from,
            to: response.to
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
                from: response.from,
                to: response.to
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