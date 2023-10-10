import {Express, Request, Response, NextFunction} from 'express';
import {headers} from '../utils';

const header = (app: Express) => {
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    headers(req, res, 'all');
    next();
  });

  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    headers(req, res, 'get');
    next();
  });
};

export default header;
