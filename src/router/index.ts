import {Express} from 'express';
import cache from './cache';
import info from './info';
import track from './track';

const router = (app: Express) => {
  const apiBasePath = process.env.API_BASE_PATH || '/api';
  cache(app, `${apiBasePath}/cache`);
  info(app, `${apiBasePath}/info`);
  track(app, `${apiBasePath}/track`);
};

export default router;
