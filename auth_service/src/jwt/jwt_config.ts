import {
  getNumericDate,
  create as jwtCreate,
  decode as jwtDecode,
  verify as jwtVerify,
  Header
} from 'https://deno.land/x/djwt@v2.2/mod.ts';

const payload = {
    iss: 'davidgarcial',
    exp: getNumericDate(new Date().getTime() + 60000)
};

const header: Header = { alg: "HS512", typ: "JWT" };

export { header, payload, jwtCreate, jwtDecode, jwtVerify };
