const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri);
const db = client.db("database");

export default db;