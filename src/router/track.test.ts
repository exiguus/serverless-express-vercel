import express from 'express';
import track from './track';
import request from 'supertest';
import packageJson from '../../package.json';

describe('router track', () => {
  test('get /track', () => {
    const app = express();
    track(app, '/track');

    return request(app)
      .get('/track')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          message: 'Get track',
          status: '200',
          timestamp: expect.any(String),
          type: 'success',
          version: packageJson.version,
          data: {
            artist: expect.any(String),
            title: expect.any(String),
          },
        });
      });
  });
});
