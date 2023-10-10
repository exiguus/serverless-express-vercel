import express, {Express} from 'express';

const staticPaths = (app: Express) => {
  app.use('/', express.static('public'));
};

export default staticPaths;
