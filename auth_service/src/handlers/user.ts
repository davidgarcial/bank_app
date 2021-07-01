import { Context } from "https://deno.land/x/oak/mod.ts";
import { FindOptions } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

import { userCollection } from "../db/dbconnect.ts";
import { UserSchema } from "../models/user.ts";
import { generateJwt } from "../jwt/jwt.ts";

const salt = await bcrypt.genSalt(8);

export const login = async (ctx: Context) => {
  try {
    const { username, password } = await ctx.request.body().value;
    const { _id } = await userCollection.findOne(
      { username: { $eq: username }, password: { $eq: password } },
      { noCursorTimeout: false } as FindOptions,
    ) as UserSchema;
    const jwt = await generateJwt(_id.toString());
    ctx.response.body = jwt;
    ctx.response.status = 200;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const createUser = async (ctx: Context) => {
  try {
    const { username, password } = await ctx.request.body().value;
    const hash = await bcrypt.hash(password, salt);
    const newUser = {
      user: username,
      password: hash,
    };

    await userCollection.insertOne(newUser);
    ctx.response.body = "";
    ctx.response.status = 200;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};
