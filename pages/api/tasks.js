import db from "../../lib/mongo";

export default async function handler(req, res) {
    const collection = db.collection("nodes");

    // * ### Read ###
    if (req.method === "GET") {
        const response = req.query;
        const node = await collection.find({ id: response.id }).toArray();

        let tasks;
        try {
            tasks = node[0].tasks;
        } catch (e) {
            tasks = [];
        }

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