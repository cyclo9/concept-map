import db from "../../lib/mongo";

export default async function handler(req, res) {
    const collection = db.collection("nodes");
    const response = req;

    // * ### Read ###
    if (req.method === "GET") {
        const response = req.query;
        const node = await collection.find({ id: response.id }).toArray();
        const tasks = node[0].tasks;

        res.status(200).json(tasks);
    }

    // * ### Create, Update, Delete ###
    if (req.method === "PUT") {
        const response = req.body;
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

    // this just has to exist in order for the api to work
}