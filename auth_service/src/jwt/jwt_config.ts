import { config } from "https://deno.land/x/dotenv/mod.ts";
const { SECRET } = config({ safe: true });

export const JwtConfig = {
    header: "Authorization",
    schema: "Bearer",
    secretKey: SECRET || "",
    expirationTime: 60000,
    type: "JWT",
    alg: "HS256"
};