import jwt from 'jsonwebtoken';
import console from 'console';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET not set');
  process.exit(1);
}
if (!process.env.JWT_ISSUER) {
  console.error('JWT_ISSUER not set');
  process.exit(1);
}
if (!process.env.JWT_ALGORITHM) {
  console.error('JWT_ALGORITHM not set');
  process.exit(1);
}

const options = {
  algorithm: process.env.JWT_ALGORITHM,
};

const unixtime = Math.floor(Date.now() / 1000);

const payload = {
  iss: process.env.JWT_ISSUER, // who created this token
  iat: unixtime, // when the token was issued (seconds since epoch)
  // exp: 1496091964000, // when the token expires (seconds since epoch)
  // scopes: {
  //   track: {
  //     actions: ['read']
  //   }
  // } // what capabilities this token has
};

const token = jwt.sign(payload, process.env.JWT_SECRET, options);

console.info('Generate token');
console.log(token);
