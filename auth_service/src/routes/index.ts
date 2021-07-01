import { Router } from "https://deno.land/x/oak/mod.ts";
import { createUser, login } from "../handlers/user.ts";

export const router = new Router()
  .post("/api/createUser", createUser)
  .post("/api/login", login);
