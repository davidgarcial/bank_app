import { Context } from "https://deno.land/x/oak/mod.ts";
import { FindOptions } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import { userCollection } from "../db/dbconnect.ts";
import { UserSchema } from "../models/user.ts";
import { generateJwt } from "../jwt/jwt.ts";

export const login = async (ctx: Context) => {
  try {
    console.log("Generating token...");
    const { username, password } = await ctx.request.body().value;
    const user = await userCollection.findOne(
      { username: { $eq: username }, password: { $eq: password } },
      { noCursorTimeout: false } as FindOptions,
    ) as UserSchema;

    console.log(user._id.toString());
    const jwt = await generateJwt(user._id.toString());
    ctx.response.body = { user, jwt };
    ctx.response.status = 200;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};
