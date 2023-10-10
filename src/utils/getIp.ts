import {Request} from 'express';
// TODO - add tests
export const getIp = (req: Request) =>
  `${
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    req.ip ||
    'unknown'
  }`;
