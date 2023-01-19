import db from "../../../lib/mongo";

export default async function handler(req, res) {
    const collection = db.collection("nodes");

    const response = req.query;

    // await collection.insertOne(
    //     {
    //         id: response.id,
    //         location: response.location,
    //         label: response.label,
    //         entries: [],
    //         tasks: []
    //     }
    // )

    // this just has to exist in order for the api to work
    res.status(200).json(response);
}