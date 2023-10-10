import apiCache from 'apicache';
import {Express, Request} from 'express';
import {isDebug} from '../utils';

const store = apiCache.options({
  trackPerformance: true,
  debug: isDebug(),
}).middleware;

const apiBasePath = process.env.API_BASE_PATH || '/api';

const onlyStatus200 = (req: Request) => req.statusCode === 200;

const onlyStatic = (req: Request) =>
  req.method === 'GET' && !req.path.startsWith(apiBasePath);

export const cacheSuccess = store('5 minutes', onlyStatus200);

const cache = (app: Express) => {
  app.use(store('5 minutes', onlyStatic));
};

export default cache;
