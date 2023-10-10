import {Request} from 'express';
import {isDevelopment} from '.';

export const getToken = function fromHeaderOrQuerystring(
  req: Request,
): string | undefined {
  const apiBasePath = process.env.API_BASE_PATH || '/api';
  if (!req.path.startsWith(apiBasePath)) return;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else if (isDevelopment() && req.query && req.query.token) {
    return req.query.token.toString();
  }
  const error = new Error('No authorization token was found');
  error.name = 'UnauthorizedError';
  throw error;
};
