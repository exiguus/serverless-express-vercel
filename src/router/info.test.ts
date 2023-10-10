import express from 'express';
import info from './info';
import request from 'supertest';
import packageJson from '../../package.json';

describe('router info', () => {
  test('get /info', () => {
    const app = express();
    info(app, '/info');

    return request(app)
      .get('/info')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Get info',
          status: '200',
          timestamp: expect.any(String),
          type: 'success',
          version: packageJson.version,
          data: {
            ip: expect.any(String),
            timestamp: expect.any(String),
          },
        });
      });
  });

  test('get info reqHeaders', () => {
    const app = express();
    info(app, '/info');

    return request(app)
      .get('/info/req/headers')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Get info: request headers',
          status: '200',
          timestamp: expect.any(String),
          type: 'success',
          version: packageJson.version,
          data: {
            'accept-encoding': expect.any(String),
            connection: 'close',
            host: expect.any(String),
          },
        });
      });
  });
});
