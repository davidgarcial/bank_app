import { MongoClient } from "https://deno.land/x/mongo@v0.23.1/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// Mongo Connection Init
const client = new MongoClient();
const { URI } = config({ safe: true });

interface UserSchema {
  _id: { $oid: string };
  name: string;
}

try {
  console.log(URI);
  await client.connect(URI);
  
  console.log("Database successfully connected");
} catch (err) {
  console.log(err);
}

const db = client.database("bank_app"); 
const userCollection = db.collection<UserSchema>("Users");

export { db, userCollection };