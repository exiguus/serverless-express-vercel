import {test, expect} from '@playwright/test';

// Request context is reused by all tests in the file.
let apiContext;
const baseURL = `${process.env.E2E_TEST_BASE_URL}`;

test.afterEach(async () => {
  // Dispose responses.
  await apiContext.dispose();
});

test('info success response is correct', async ({playwright}) => {
  apiContext = await playwright.request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  const getInfo = await apiContext.get(`/api/info`);
  expect(getInfo.ok()).toBeTruthy();
  const info = await getInfo.json();
  expect(info.type).toBe('success');
  expect(info.message).toBe('Get info');
  expect(info.status).toBe('200');
  expect(info).toHaveProperty('timestamp');
  expect(info).toHaveProperty('data');
  expect(info.data).toHaveProperty('ip');
  expect(info.data).toHaveProperty('userAgent');
  expect(info.data).toHaveProperty('timestamp');
});

test('info res header success response is correct', async ({playwright}) => {
  apiContext = await playwright.request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  const getInfo = await apiContext.get(`/api/info/req/headers`);
  expect(getInfo.ok()).toBeTruthy();
  const info = await getInfo.json();
  expect(info.type).toBe('success');
  expect(info.message).toBe('Get info: request headers');
  expect(info.status).toBe('200');
  expect(info).toHaveProperty('timestamp');
  expect(info).toHaveProperty('data');
  expect(info.data).toHaveProperty('accept');
  expect(info.data).toHaveProperty('authorization');
  expect(info.data).toHaveProperty('host');
});

// Have similar error tests for all routes.
[
  {
    title: 'info',
    path: '/api/info',
  },
  {
    title: 'info req headers',
    path: '/api/info/req/headers',
  },
  {
    title: 'info not exist',
    path: '/api/info/not-exist',
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

    const getInfo = await apiContext.get(path);
    expect(getInfo.ok()).toBeFalsy();
    const info = await getInfo.json();
    expect(info.type).toBe('error');
    expect(info.message).toBe('jwt malformed');
    expect(info.status).toBe('401');
    expect(info).toHaveProperty('timestamp');
    expect(info).toHaveProperty('version');
    expect(info).not.toHaveProperty('data');
    expect(info).toHaveProperty('error');
    expect(info.error).toHaveProperty('code');
    expect(info.error).toHaveProperty('name');
    expect(info.error).toHaveProperty('message');
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

    const getInfo = await apiContext.get(path);
    expect(getInfo.ok()).toBeFalsy();
    const info = await getInfo.json();
    expect(info.type).toBe('error');
    expect(info.message).toBe('No authorization token was found');
    expect(info.status).toBe('401');
    expect(info).toHaveProperty('timestamp');
    expect(info).toHaveProperty('version');
    expect(info).not.toHaveProperty('data');
    expect(info).toHaveProperty('error');
    expect(info.error).toHaveProperty('name');
  });
});
