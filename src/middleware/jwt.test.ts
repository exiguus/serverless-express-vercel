import express from 'express';
import jwt from './jwt';
import request from 'supertest';

describe('jwt', () => {
  test('jwt no token', () => {
    const app = express();
    jwt(app);

    app.use('/api', (req, res) => {
      res.json({message: 'Hello from api!'});
    });

    return request(app)
      .get('/api')
      .expect(401)
      .then((res) => {
        expect(res.headers).toEqual({
          connection: 'close',
          'content-length': expect.any(String),
          'content-type': 'application/json; charset=utf-8',
          date: expect.any(String),
          etag: expect.any(String),
          'x-powered-by': 'Express',
        });
      });
  });

  test('jwt invalid token', () => {
    const app = express();
    jwt(app);

    app.use('/api', (req, res) => {
      res.json({message: 'Hello from api!'});
    });

    return request(app)
      .get('/api')
      .set('Authorization', 'Bearer 123')
      .expect(401)
      .then((res) => {
        expect(res.headers).toEqual({
          connection: 'close',
          'content-length': expect.any(String),
          'content-type': 'application/json; charset=utf-8',
          date: expect.any(String),
          etag: expect.any(String),
          'x-powered-by': 'Express',
        });
      });
  });

  test('jwt valid token', () => {
    const app = express();
    jwt(app);

    app.use('/api', (req, res) => {
      res.json({message: 'Hello from api!'});
    });

    return request(app)
      .get('/api')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({message: 'Hello from api!'});
      });
  });
});
