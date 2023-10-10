import {Express, Router, Request, Response} from 'express';
import {checkError, sendError, sendSuccess} from '../utils';
import * as service from '../service/info';

const info = (app: Express, path: string) => {
  const router = Router();

  router.get('/req/headers', (req: Request, res: Response) => {
    try {
      sendSuccess<service.InfoReqHeaders>(res, {
        message: 'Get info: request headers',
      })(service.reqHeaders(req));
    } catch (err) {
      const error = checkError(err);
      sendError(res, {status: error.status, message: error.message})(error);
    }
  });

  router.get('/', (req: Request, res: Response) => {
    try {
      sendSuccess<service.Info>(res, {message: 'Get info'})(service.index(req));
    } catch (err) {
      const error = checkError(err);
      sendError(res, {status: error.status, message: error.message})(error);
    }
  });

  app.use(path, router);
};

export default info;
