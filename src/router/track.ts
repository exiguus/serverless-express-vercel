import {Express, Router, Request, Response} from 'express';
import {checkError, sendError, sendSuccess} from '../utils';
import * as service from '../service/track';

const track = (app: Express, path: string) => {
  const router = Router();

  router.get('/', async (req: Request, res: Response) => {
    try {
      sendSuccess<service.Track>(res, {message: 'Get track'})(
        await service.index(),
      );
    } catch (err) {
      const error = checkError(err);
      sendError(res, {status: error.status, message: error.message})(error);
    }
  });

  app.use(path, router);
};

export default track;
