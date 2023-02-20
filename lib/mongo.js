import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI
const client = new MongoClient(uri);
const db = client.db("data");

export default db;