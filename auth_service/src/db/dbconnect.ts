import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { UserSchema } from '../models/user.ts';

// Mongo Connection Init
const client = new MongoClient();
const { DB_NAME, HOST, USER, PASS } = config({ safe: true });

try {
  // await client.connect(CLOUD_URI);
  await client.connect({
    db: DB_NAME,
    tls: true,
    servers: [
      {
        host: HOST,
        port: 27017
      }
    ],
    credential: {
      username: USER,
      password: PASS,
      db: DB_NAME,
      mechanism: "SCRAM-SHA-1",
    },
  });
  console.log("Database successfully connected");
} catch (err) {
  console.log(err);
}

const db = client.database("bank_app"); 
const userCollection = db.collection<UserSchema>("Users");

export { db, userCollection, Bson };