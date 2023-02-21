import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);
const db = client.db("database");

export default db;