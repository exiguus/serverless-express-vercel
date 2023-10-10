import compress from 'compression';
import {Express} from 'express';

const compression = (app: Express) => {
  app.use(
    compress({
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }
        return compress.filter(req, res);
      },
      level: 6,
    }),
  );
};

export default compression;
