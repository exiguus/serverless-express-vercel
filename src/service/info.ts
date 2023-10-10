import {Request} from 'express';
import {getIp} from '../utils';

export type Info = {
  timestamp: string;
  ip: string;
  userAgent: string | undefined;
  language: string | undefined;
};

export const index = (req: Request): Info => {
  const timestamp = new Date().toISOString();
  const ip = getIp(req);
  const userAgent = req.headers['user-agent'];
  const language = req.headers['accept-language'];
  return {timestamp, ip, userAgent, language};
};

export type InfoReqHeaders = Request['headers'];

export const reqHeaders = (req: Request): InfoReqHeaders => {
  return req.headers;
};
