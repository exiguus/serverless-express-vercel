import {test, expect} from '@playwright/test';
import config from '../package.json';

const baseURL = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;

test('has title', async ({page}) => {
  await page.goto(baseURL);

  await expect(page).toHaveTitle(`${config.name} - ${config.description}`);
});

test('has heading', async ({page}) => {
  await page.goto(baseURL);

  expect(await page.getByTestId('name').textContent()).toBe(config.name);
  expect(await page.getByTestId('description').textContent()).toBe(
    config.description,
  );
  expect(await page.getByTestId('version').textContent()).toBe(
    `Version: ${config.version}`,
  );
});

test('has content', async ({page}) => {
  await page.goto(baseURL);

  expect(await page.getByTestId('documentation').textContent()).toBe(
    'Documentation',
  );
  expect(await page.getByTestId('redoc').textContent()).toBe('Redoc');
  expect(await page.getByTestId('swagger').textContent()).toBe('Swagger');
  expect(await page.getByTestId('redoc').getAttribute('href')).toBe('/redoc');
  expect(await page.getByTestId('swagger').getAttribute('href')).toBe(
    '/swagger',
  );
});

test('has footer', async ({page}) => {
  await page.goto(baseURL);

  expect(await page.getByTestId('author').textContent()).toBe(
    config.author['name'],
  );
  expect(await page.getByTestId('author').getAttribute('href')).toBe(
    config.author['url'],
  );
  expect(await page.getByTestId('repository').textContent()).toBe(
    config.repository['type'],
  );
  expect(await page.getByTestId('repository').getAttribute('href')).toBe(
    config.repository['url'],
  );
});
