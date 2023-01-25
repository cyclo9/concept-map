import db from "../../../lib/mongo";

export default async function handler(req, res) {
    const collection = db.collection("axons");

    const response = req.query;

    await collection.insertOne(
        {
            id: response.id,
            from: response.from,
            to: response.to
        }
    )

    // this just has to exist in order for the api to work
    res.status(200).json(response);
}