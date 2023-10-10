import {Express, Router, Request, Response} from 'express';
import {sendSuccess, sendError, checkError} from '../utils';
import * as service from '../service/cache';

const cache = (app: Express, path: string) => {
  const router = Router();

  // cache api
  // add route to display cache performance
  router.get('/performance', (_req: Request, res: Response) => {
    try {
      sendSuccess<service.CachePerformance>(res, {
        message: 'Get cache: performance',
      })(service.performance());
    } catch (err) {
      const error = checkError(err);
      sendError(res, {status: error.status, message: error.message})(error);
    }
  });

  // // add route to display cache index
  router.get('/', (_req: Request, res: Response) => {
    try {
      sendSuccess<service.Cache>(res, {message: 'Get cache'})(service.index());
    } catch (err) {
      const error = checkError(err);
      sendError(res, {status: error.status, message: error.message})(error);
    }
  });

  app.use(path, router);
};

export default cache;
