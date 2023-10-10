import {Request, Response, NextFunction, Express} from 'express';
import {checkError, sendError} from '../utils';

const error = (app: Express) => {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }
    if (err) {
      const error = checkError(err);
      sendError(res, {status: error.status, message: error.message})(error);
    } else {
      next();
    }
  });
};

export default error;
