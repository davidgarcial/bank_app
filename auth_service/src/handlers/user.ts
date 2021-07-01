import { Context } from "https://deno.land/x/oak/mod.ts";
import { FindOptions } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { hash, verify } from "https://deno.land/x/scrypt/mod.ts";

import { userCollection } from "../db/dbconnect.ts";
import { UserSchema } from "../models/user.ts";
import { generateJwt } from "../jwt/jwt.ts";

export const login = async (ctx: Context) => {
  try {
    const { username, password } = await ctx.request.body().value;
    const pwdCrypt = await hash(password);
    console.log(pwdCrypt);
    const user = await userCollection.findOne(
      { username: { $eq: username } },
      { noCursorTimeout: false } as FindOptions,
    ) as UserSchema;

    console.log(user.password);
    const jwt = await generateJwt(user._id.toString());

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
    const pwdCrypt = await hash(password);

    const newUser = {
      user: username,
      password: pwdCrypt,
    };

    await userCollection.insertOne(newUser);

    ctx.response.body = "User created succsesful!!!";
    ctx.response.status = 200;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};
