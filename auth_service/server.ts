import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

// GET request to "/api/helloworld"
router.get("/api/helloworld", (ctx) => {
  ctx.response.body = "Hello World!";
  ctx.response.status = 201;
});

await app.listen({ port: 8000 });