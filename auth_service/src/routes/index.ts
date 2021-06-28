import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getAllUser
} from "../handlers/user.ts";

export const router = new Router()
  .get('/api/users', getAllUser);
  //User routes
  /*
  .get("/api/users/:userId", findUser)
  .delete("/api/users/:userId", deleteUser)
  .patch("/api/users", updateUser)
  .post("/api/users", createUser);*/
