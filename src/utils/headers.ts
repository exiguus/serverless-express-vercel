import {Express, Request, Response} from 'express';
import config from '../../package.json';

export type RequestType = keyof Pick<
  Express,
  'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
>;

export const headers = (req: Request, res: Response, reqType: RequestType) => {
  if (reqType === 'all') {
    res.header('x-powered-by', `SSGPA ${config.version} ${config.description}`);
    res.header('x-clacks-overhead', 'GNU Terry Pratchett');
  }
  if (reqType === 'get') {
    res.header('cache-control', 'max-age=10');
  }
};
