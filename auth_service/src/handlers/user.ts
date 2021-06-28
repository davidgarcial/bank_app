import { Context, helpers } from 'https://deno.land/x/oak/mod.ts';
import { FindOptions } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { userCollection } from '../db/dbconnect.ts';

// JWT Config
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";

const key = "secret-key";
const payload: Payload = {
  iss: "davidgarcial",
  exp: setExpiration(new Date().getTime() + 60000),
};
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export const login = async (ctx: Context) => {
  try {
    console.log('Generating token...');
    const { userId } = helpers.getQuery(ctx, { mergeParams: true });
    const users = await userCollection.find({ _id: userId }, { noCursorTimeout: false } as FindOptions).toArray();
    ctx.response.body = users;
    ctx.response.status = 200;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};