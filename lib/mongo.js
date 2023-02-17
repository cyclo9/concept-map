import { MongoClient } from "mongodb";

const uri = "mongodb+srv://mongo:M0ng0DB@concept-map.tngl4uz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = client.db("data");

export default db;