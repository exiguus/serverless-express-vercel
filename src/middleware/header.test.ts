import express from 'express';
import header from './header';
import request from 'supertest';
import config from '../../package.json';

const expectHeaders = {
  'cache-control': 'max-age=10',
  connection: 'close',
  'content-length': expect.any(String),
  'content-security-policy': "default-src 'none'",
  'content-type': 'text/html; charset=utf-8',
  date: expect.any(String),
  'x-clacks-overhead': 'GNU Terry Pratchett',
  'x-content-type-options': 'nosniff',
  'x-powered-by': `SSGPA ${config.version} ${config.description}`,
};

describe('middleware header', () => {
  test('correct header are shown', () => {
    const app = express();
    header(app);
    return request(app)
      .get('/')
      .expect(404)
      .then((res) => {
        expect(res.headers).toEqual(expectHeaders);
      });
  });
});
