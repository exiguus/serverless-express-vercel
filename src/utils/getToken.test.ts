import {getToken} from './getToken';
import {Request} from 'express';

const apiBasePath = process.env.API_BASE_PATH || '/api';

describe('getToken', () => {
  test('should return token from header', () => {
    const req = {
      headers: {
        authorization: 'Bearer 1234',
      },
      path: apiBasePath,
    };

    expect(getToken(req as Request)).toBe('1234');
  });

  test('should throw error from missing header', () => {
    const req = {
      headers: {},
      path: apiBasePath,
    };

    expect(() => getToken(req as Request)).toThrowError(
      'No authorization token was found',
    );
  });

  test('should return from unmatched apiBasePath', () => {
    const req = {
      headers: {},
      path: '/unmatchedApiBasePath',
    };

    expect(getToken(req as Request)).toBe(undefined);
  });
});
