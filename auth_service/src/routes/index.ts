import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  login
} from "../handlers/user.ts";

export const router = new Router()
  .get('/api/users', login);
