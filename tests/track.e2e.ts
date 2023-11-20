import {test, expect} from '@playwright/test';

// Request context is reused by all tests in the file.
let apiContext;
const baseURL = `${process.env.E2E_TEST_BASE_URL}`;

test.afterEach(async () => {
  // Dispose responses.
  await apiContext.dispose();
});

test('track success response is correct', async ({playwright}) => {
  apiContext = await playwright.request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  const getTrack = await apiContext.get(`/api/track`);
  expect(getTrack.ok()).toBeTruthy();
  const track = await getTrack.json();
  expect(track.type).toBe('success');
  expect(track.message).toBe('Get track');
  expect(track.status).toBe('200');
  expect(track).toHaveProperty('timestamp');
  expect(track).toHaveProperty('version');
  expect(track).toHaveProperty('data');
  expect(track.data).toHaveProperty('artist');
  expect(track.data).toHaveProperty('title');
});

test('track error jwt malformed response is correct', async ({playwright}) => {
  apiContext = await playwright.request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      Authorization: `Bearer abcde12345`,
    },
  });

  const getTrack = await apiContext.get(`/api/track`);
  expect(getTrack.ok()).toBeFalsy();
  const track = await getTrack.json();
  expect(track.type).toBe('error');
  expect(track.message).toBe('jwt malformed');
  expect(track.status).toBe('401');
  expect(track).toHaveProperty('timestamp');
  expect(track).toHaveProperty('version');
  expect(track).not.toHaveProperty('data');
  expect(track).toHaveProperty('error');
  expect(track.error).toHaveProperty('code');
  expect(track.error).toHaveProperty('name');
  expect(track.error).toHaveProperty('message');
});

test(`track error unauthorized response is correct`, async ({playwright}) => {
  apiContext = await playwright.request.newContext({
    baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  });

  const getTrack = await apiContext.get(`/api/track`);
  expect(getTrack.ok()).toBeFalsy();
  const track = await getTrack.json();
  expect(track.type).toBe('error');
  expect(track.message).toBe('No authorization token was found');
  expect(track.status).toBe('401');
  expect(track).toHaveProperty('timestamp');
  expect(track).toHaveProperty('version');
  expect(track).not.toHaveProperty('data');
  expect(track).toHaveProperty('error');
  expect(track.error).toHaveProperty('name');
});
