import { Context, helpers } from 'https://deno.land/x/oak/mod.ts';
import { FindOptions } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { userCollection } from '../db/dbconnect.ts';

export const login = async (ctx: Context) => {
  try {
    const { userId } = helpers.getQuery(ctx, { mergeParams: true });
    const users = await userCollection.find({ _id: userId }, { noCursorTimeout: false } as FindOptions).toArray();
    ctx.response.body = users;
    ctx.response.status = 200;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};