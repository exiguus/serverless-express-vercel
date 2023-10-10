import {config as dotenvConfig} from 'dotenv';
import express from 'express';
import middleware from '../src/middleware';
import router from '../src/router';
import {isDevelopment} from '../src/utils';

dotenvConfig();

const app = express();

middleware(app);
router(app);

if (isDevelopment()) {
  app.listen(process.env.SERVER_PORT);
  console.log(`Server listening on port ${process.env.SERVER_PORT}`);
}

export default app;
