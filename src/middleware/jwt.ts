import {Express, Request, Response, NextFunction} from 'express';
import {Algorithm} from 'jsonwebtoken';
import {expressjwt} from 'express-jwt';
import {sendError, getToken, checkError} from '../utils';

const jwt = (app: Express) => {
  if (!process.env.JWT_SECRET) {
    throw Error('JWT_SECRET not set');
  }
  const secret = process.env.JWT_SECRET;
  if (!process.env.JWT_ISSUER) {
    throw Error('JWT_ISSUER not set');
  }
  const issuer = process.env.JWT_ISSUER;
  if (!process.env.JWT_ALGORITHM) {
    throw Error('JWT_ALGORITHM not set');
  }
  const algorithms = [process.env.JWT_ALGORITHM as Algorithm];

  app.use(
    expressjwt({
      secret,
      issuer,
      algorithms,
      getToken,
      credentialsRequired: true,
    })
      .unless({
        path: ['/', '/index.html', '/favicon.ico', '/robots.txt', '/test.html'],
      })
      .unless(function (req: Request) {
        return req.path.startsWith('/swagger') || req.path.startsWith('/redoc');
      }),
  );

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
      const error = checkError(err);
      error.code = 'JWT_INVALID';
      sendError(res, {status: 401, message: err.message})(err);
    } else {
      next(err);
    }
  });
};

export default jwt;
