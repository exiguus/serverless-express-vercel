import {Express} from 'express';
import cache from './cache';
import cors from './cors';
import compression from './compression';
import header from './header';
// import swagger from './swagger';
import staticPaths from './staticPaths';
import jwt from './jwt';
import error from './error';

const middleware = (app: Express) => {
  compression(app);
  cors(app);
  cache(app);
  header(app);
  jwt(app);
  // we use swagger as static path
  // swagger(app);
  staticPaths(app);
  error(app);
};

export default middleware;
