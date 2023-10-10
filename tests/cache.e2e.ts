import {test, expect} from '@playwright/test';

// Request context is reused by all tests in the file.
let apiContext;
const baseURL = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;

test.afterEach(async () => {
  // Dispose responses.
  await apiContext.dispose();
});

test('cache success response is correct', async ({playwright}) => {
  apiContext = await playwright.request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  const getCache = await apiContext.get(`/api/cache`);
  expect(getCache.ok()).toBeTruthy();
  const cache = await getCache.json();
  expect(cache.type).toBe('success');
  expect(cache.message).toBe('Get cache');
  expect(cache.status).toBe('200');
  expect(cache).toHaveProperty('timestamp');
  expect(cache).toHaveProperty('data');
  expect(cache.data).toHaveProperty('all');
  expect(cache.data).toHaveProperty('groups');
});

test('cache performance success response is correct', async ({playwright}) => {
  apiContext = await playwright.request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  const getCache = await apiContext.get(`/api/cache/performance`);
  expect(getCache.ok()).toBeTruthy();
  const cache = await getCache.json();
  expect(cache.type).toBe('success');
  expect(cache.message).toBe('Get cache: performance');
  expect(cache.status).toBe('200');
  expect(cache).toHaveProperty('timestamp');
  expect(cache).toHaveProperty('data');
});

// Have similar error tests for all routes.
[
  {
    title: 'cache',
    path: '/api/cache',
  },
  {
    title: 'cache performance',
    path: '/api/cache/performance',
  },
  {
    title: 'cache not exist',
    path: '/api/cache/not-exist',
  },
].forEach(({title, path}) => {
  test(`${title} error jwt malformed response is correct`, async ({
    playwright,
  }) => {
    apiContext = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Accept: 'application/json',
        Authorization: `Bearer abcde12345`,
      },
    });

    const getCache = await apiContext.get(path);
    expect(getCache.ok()).toBeFalsy();
    const cache = await getCache.json();
    expect(cache.type).toBe('error');
    expect(cache.message).toBe('jwt malformed');
    expect(cache.status).toBe('401');
    expect(cache).toHaveProperty('timestamp');
    expect(cache).toHaveProperty('version');
    expect(cache).not.toHaveProperty('data');
    expect(cache).toHaveProperty('error');
    expect(cache.error).toHaveProperty('code');
    expect(cache.error).toHaveProperty('name');
    expect(cache.error).toHaveProperty('message');
  });

  test(`${title} error unauthorized response is correct`, async ({
    playwright,
  }) => {
    apiContext = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });

    const getCache = await apiContext.get(path);
    expect(getCache.ok()).toBeFalsy();
    const cache = await getCache.json();
    expect(cache.type).toBe('error');
    expect(cache.message).toBe('No authorization token was found');
    expect(cache.status).toBe('401');
    expect(cache).toHaveProperty('timestamp');
    expect(cache).toHaveProperty('version');
    expect(cache).not.toHaveProperty('data');
    expect(cache).toHaveProperty('error');
    expect(cache.error).toHaveProperty('name');
  });
});
