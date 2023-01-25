import db from "../../../lib/mongo";

export default async function handler(req, res) {
    const collection = db.collection("axons");

    const response = req.query;

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

    // this just has to exist in order for the api to work
    res.status(200).json(response);
}