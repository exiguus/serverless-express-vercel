import express from 'express';
import cache from './cache';
import request from 'supertest';
import packageJson from '../../package.json';

describe('router cache', () => {
  test('get /cache', () => {
    const app = express();
    cache(app, '/cache');

    return request(app)
      .get('/cache')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Get cache',
          status: '200',
          timestamp: expect.any(String),
          type: 'success',
          version: packageJson.version,
          data: {
            all: expect.any(Array),
            groups: expect.any(Object),
          },
        });
      });
  });

  test('get cache performance', () => {
    const app = express();
    cache(app, '/cache');

    return request(app)
      .get('/cache/performance')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Get cache: performance',
          status: '200',
          timestamp: expect.any(String),
          type: 'success',
          version: packageJson.version,
          data: expect.any(Array),
        });
      });
  });
});
