import express from 'express';
import error from './error';
import request from 'supertest';
import {ExtendedError} from '../utils';

describe('middleware error', () => {
  test('show error', () => {
    const app = express();
    error(app);
    app.use('/', () => {
      throw new Error('Get error');
    });
    return request(app).get('/').expect(500);
  });

  test('show extended error', () => {
    const app = express();
    error(app);
    app.use('/', () => {
      const error: ExtendedError = new Error('Get error');
      error.status = 400;
      throw error;
    });
    return request(app).get('/').expect(400);
  });
});
