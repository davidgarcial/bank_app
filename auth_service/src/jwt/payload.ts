import { setExpiration } from 'https://deno.land/x/djwt/create.ts';

const payload = {
    iss: 'davidgarcial',
    exp: setExpiration(new Date().getTime() + 60000),
};

const header = {
  alg: "HS256",
  typ: "JWT",
};

export { header, payload };