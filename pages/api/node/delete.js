import db from "../../../lib/mongo";

export default async function handler(req, res) {
    const collection = db.collection("nodes");

    const response = req.query;

    await collection.deleteOne({ id: response.id })

    // this just has to exist in order for the api to work
    res.status(200).json(response);
}