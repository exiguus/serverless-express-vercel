import {Express} from 'express';
import expressCors, {CorsOptions, CorsOptionsDelegate} from 'cors';
import {ExtendedError} from '../utils';

const allowList = process.env.CORS_ORIGIN?.split(',') || ['http://localhost'];
const defaultOptions: CorsOptions = {
  origin: allowList,
  methods: 'GET',
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: 'Content-Length,Content-Type',
  maxAge: 86400,
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const corsOptions: CorsOptionsDelegate = (req, callback) => {
  const options: CorsOptions = defaultOptions;
  const origin = req.headers['origin'];
  const allowList = process.env.CORS_ORIGIN?.split(',') || ['http://localhost'];
  let error: ExtendedError | null = null;
  if (origin) {
    if (allowList.includes(origin)) {
      options.origin = true; // reflect (enable) the requested origin in the CORS response
    } else {
      error = new Error('Not allowed');
      error.status = 403;
      error.code = 'CORS_NOT_ALLOWED';
    }
  } else {
    options.origin = false; // disable CORS for this request
  }

  callback(error, options);
};

const cors = (app: Express) => {
  app.use(expressCors(corsOptions));
  app.options('*', expressCors(corsOptions));
};

export default cors;
