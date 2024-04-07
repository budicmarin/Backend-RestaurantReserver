import { MongoClient } from "mongodb";
const connectionString =
  "mongodb+srv://test:test@clustertest.ndyns6h.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);
let conn = null;

try {
  console.log("Trying to establish connection...");
  conn = await client.connect();
} catch (e) {
  console.error(e);
}
let db = conn.db("RestaurantReserver");

export default db;
