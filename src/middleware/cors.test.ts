import express from 'express';
import cors from './cors';
import request from 'supertest';

describe('middleware cors', () => {
  test('correct CORS options', () => {
    const app = express();
    cors(app);
    app.use('/', (req, res) => {
      res.send('Hello World!');
    });

    return request(app)
      .options('/')
      .set(
        'origin',
        process.env.CORS_ORIGIN?.split(',')?.[0] || 'http://localhost',
      )
      .expect(204);
  });

  test('correct CORS get', () => {
    const app = express();
    cors(app);
    app.use('/', (req, res) => {
      res.send('Hello World!');
    });

    return request(app)
      .get('/')
      .set(
        'origin',
        process.env.CORS_ORIGIN?.split(',')?.[0] || 'http://localhost',
      )
      .expect(200)
      .then((res) => {
        expect(res.headers).toEqual({
          'access-control-allow-credentials': 'true',
          'access-control-allow-origin': expect.any(String),
          'access-control-expose-headers': 'Content-Length,Content-Type',
          connection: 'close',
          'content-length': expect.any(String),
          'content-type': 'text/html; charset=utf-8',
          date: expect.any(String),
          etag: expect.any(String),
          vary: 'Origin',
          'x-powered-by': 'Express',
        });
      });
  });

  test('incorrect CORS get', async () => {
    const app = express();
    cors(app);
    app.use('/', (req, res) => {
      res.send('Hello World!');
    });

    return request(app)
      .get('/')
      .set('origin', 'https://example.org')
      .expect(403);
  });

  test('incorrect CORS options', async () => {
    const app = express();
    cors(app);
    app.use('/', (req, res) => {
      res.send('Hello World!');
    });
    return request(app)
      .options('/')
      .set('origin', 'https://example.org')
      .expect(403);
  });

  test('no CORS get', async () => {
    const app = express();
    cors(app);
    app.use('/', (req, res) => {
      res.send('Hello World!');
    });

    return request(app)
      .get('/')
      .expect(200)
      .then((res) => {
        expect(res.headers).toEqual({
          connection: 'close',
          'content-length': expect.any(String),
          'content-type': 'text/html; charset=utf-8',
          date: expect.any(String),
          etag: expect.any(String),
          'x-powered-by': 'Express',
        });
      });
  });
});
