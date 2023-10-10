import express from 'express';
import router from './index';
import request from 'supertest';

describe('router', () => {
  test('get /not-exist', () => {
    const app = express();
    router(app);
    return request(app)
      .get('/not-exist')
      .expect(404)
      .then((res) => {
        expect(res.body).toStrictEqual({});
      });
  });
});
