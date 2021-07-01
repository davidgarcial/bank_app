import { Context } from "https://deno.land/x/oak/mod.ts";
import { FindOptions } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { hash, verify } from "https://deno.land/x/scrypt/mod.ts";

import { userCollection } from "../db/dbconnect.ts";
import { UserSchema } from "../models/user.ts";
import { generateJwt } from "../jwt/jwt.ts";

export const login = async (ctx: Context) => {
  try {
    const { username, password } = await ctx.request.body().value;
    const user = await userCollection.findOne(
      { username: { $eq: username } },
      { noCursorTimeout: false } as FindOptions,
    ) as UserSchema;

    const pwd = await verify(password, user.password);
    if (pwd) {
      const jwt = await generateJwt(user._id.toString());
      ctx.response.body = jwt;
      ctx.response.status = 200;
    } else {
      throw new Error("The password is wrong.");
    }
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
