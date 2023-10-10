import {index, reqHeaders} from './info';
import {Request} from 'express';

describe('service info', () => {
  test('index data', async () => {
    const req = {
      headers: {
        'user-agent': 'test',
        'accept-language': 'en',
        'x-forwarded-for': '::1',
      },
    };

    const data = await index(req as unknown as Request);
    expect(data).toEqual({
      timestamp: expect.any(String),
      ip: '::1',
      userAgent: 'test',
      language: 'en',
    });
  });

  test('reqHeaders data', async () => {
    const req = {
      headers: {
        'user-agent': 'test',
        'accept-language': 'en',
        'x-forwarded-for': '::1',
      },
    };

    const data = await reqHeaders(req as unknown as Request);
    expect(data).toEqual({
      'user-agent': 'test',
      'accept-language': 'en',
      'x-forwarded-for': '::1',
    });
  });
});
