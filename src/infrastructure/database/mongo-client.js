import { MongoClient } from "mongodb";
import { config } from "../../../config";

const mongoUri = config.MONGODB_URI;
const mongoDbName = config.MONGODB_DB_NAME;

let client = null;
let connectPromise = null;

async function getClient() {
  if (client) {
    return client;
  }
  if (!connectPromise) {
    const mongoClient = new MongoClient(mongoUri);
    connectPromise = mongoClient.connect().then((connectedClient) => {
      client = connectedClient;
      return connectedClient;
    });
  }
  return connectPromise;
}
export async function getCollection(collectionName) {
  const connectedClient = await getClient();
  return connectedClient.db(mongoDbName).collection(collectionName);
}
