import db from "../../lib/mongo";

export default async function handler(req: any, res: any) {
    interface Response {
        id: string,
        data: string[]
    }

    const collection = db.collection('nodes');

    // * ### Read ###
    if (req.method === 'GET') {
        const response: Response = req.query;
        const node = await collection.find({ id: response.id }).toArray();
        const data = node[0].data;
        res.status(200).json(data);
    }

    // * ### Update ###
    if (req.method === 'PUT') {
        const response: Response = req.body;

        const filter = {
            id: response.id
        }
        const update = {
            $set: {
                data: response.data
            }
        }

        await collection.updateOne(filter, update);

        res.status(200).json(response);
    }
}