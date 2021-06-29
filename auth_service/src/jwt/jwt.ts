import {
  getNumericDate,
  create as jwtCreate,
  decode as jwtDecode,
  verify as jwtVerify,
  Header
} from 'https://deno.land/x/djwt@v2.2/mod.ts';
import { JwtConfig } from './jwt_config.ts';


const header: Header = { alg: "HS512", typ: "JWT" };

const generateJwt = async (id: string) => {
  const payload = {
    id,
    exp: getNumericDate(new Date().getTime() + 60000)
  };

  return await jwtCreate(header, payload, JwtConfig.secretKey);
}

export { generateJwt };
