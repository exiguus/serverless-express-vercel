import express from 'express';
import compression from './compression';
import request from 'supertest';
import fs from 'fs';
import path from 'path';

describe('middleware compression', () => {
  test('correct compression', () => {
    const app = express();
    compression(app);
    app.use('/', (req, res) => {
      fs.readFile(
        path.join(__dirname, '../../public/index.html'),
        (err, data) => {
          if (err) {
            res.header('Content-Type', 'text/plain');
            res.status(404).send('Not Found');
          } else {
            res.header('Content-Type', 'text/html');
            res.send(data);
          }
        },
      );
    });

    return request(app)
      .get('/')
      .set('Accept-Encoding', 'gzip')
      .set('Accept', 'text/html')
      .expect(200)
      .then((res) => {
        expect(res.header['content-encoding']).toEqual('gzip');
      });
  });

  test('disable compression', async () => {
    const app = express();
    compression(app);
    app.use('/', (req, res) => {
      res.send('Hello World!');
    });

    return request(app)
      .get('/')
      .expect(200)
      .then((res) => {
        expect(res.header['content-encoding']).toBeUndefined();
      });
  });
});
