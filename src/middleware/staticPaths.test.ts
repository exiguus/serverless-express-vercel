import express from 'express';
import staticPaths from './staticPaths';
import request from 'supertest';

describe('middleware staticPath', () => {
  test('get public', () => {
    const app = express();
    staticPaths(app);

    return request(app)
      .get('/public')
      .expect(404)
      .then((res) => {
        expect(res.body).toStrictEqual({});
      });
  });

  test('get public favicon.ico', () => {
    const app = express();
    staticPaths(app);

    return request(app)
      .get('/robots.txt')
      .expect(200)
      .then((res) => {
        expect(res.body).toStrictEqual({});
      });
  });

  test('get public robots.txt', () => {
    const app = express();
    staticPaths(app);

    return request(app)
      .get('/robots.txt')
      .expect(200)
      .then((res) => {
        expect(res.body).toStrictEqual({});
      });
  });
  test('get public index.html', () => {
    const app = express();
    staticPaths(app);

    return request(app)
      .get('/index.html')
      .expect(200)
      .then((res) => {
        expect(res.body).toStrictEqual({});
      });
  });
});
