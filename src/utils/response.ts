import {Response} from 'express';
import {version} from '../../package.json';
import {ExtendedError} from './error';
import {isDebug, log} from '.';

export type SuccessResponse<T> = {
  type: 'success';
  status: string;
  message: string;
  timestamp: string;
  version: string;
  data: T;
};

export type ErrorResponse = {
  type: 'error';
  status: string;
  message: string;
  timestamp: string;
  version: string;
  error?: ExtendedError;
};

const baseLog = (res: Response) => ({
  originalUrl: res.req.originalUrl,
  baseUrl: res.req.baseUrl,
  url: res.req.url,
  query: JSON.stringify(res.req.query),
  body: JSON.stringify(res.req.body),
  host: JSON.stringify(res.req.headers.host),
  hostname: res.req.hostname,
  path: res.req.path,
  method: res.req.method,
});

export const sendSuccess =
  <T>(res: Response, {message}: {message: string}) =>
  (data: T) => {
    const type = 'success';
    const timestamp = `${Math.floor(Date.now() / 1000)}`;
    const response: SuccessResponse<T> = {
      type,
      status: '200',
      message,
      timestamp,
      version,
      data,
    };
    log(
      {
        ...baseLog(res),
        type,
        status: '200',
        message,
        timestamp,
        version,
        data: JSON.stringify(data),
      },
      'info',
    );
    res.status(200).json(response);
  };

export const sendError =
  (
    res: Response,
    {status, message}: {status?: ExtendedError['status']; message?: string},
  ) =>
  (error: ExtendedError) => {
    const type = 'error';
    const timestamp = `${Math.floor(Date.now() / 1000)}`;
    status = status || error.status || 500;
    message = message || error.message || 'Default Error';
    const response: ErrorResponse = {
      type: type,
      status: `${status}`,
      timestamp,
      version,
      message,
      error: isDebug()
        ? error
        : {
            name: error.name,
            code: error.code,
            type: error.type,
            message: error.message,
          },
    };
    log(
      {
        ...baseLog(res),
        type,
        status: `${status}`,
        timestamp,
        version,
        message,
        error: JSON.stringify(error),
      },
      `${status}` === '500' ? 'error' : 'warn',
    );
    res.status(status).json(response);
  };
