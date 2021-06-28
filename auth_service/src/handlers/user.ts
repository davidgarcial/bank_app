import { Context } from 'https://deno.land/x/oak/mod.ts';
import { FindOptions } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { userCollection } from '../db/dbconnect.ts';
import { header, jwtCreate, payload } from '../jwt/jwt_config.ts';
import { UserSchema } from '../models/user.ts';

export const login = async (ctx: Context) => {
  try {
    console.log('Generating token...');
    const { username, password } = await ctx.request.body().value;
    const user = await userCollection.findOne(
      { username: { $eq: username }, password: { $eq: password } }, 
      { noCursorTimeout: false } as FindOptions
    ) as UserSchema;
    console.log(user);
    // const jwt = await jwtCreate(header, payload, _id);
    ctx.response.body = user;
    ctx.response.status = 200;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};