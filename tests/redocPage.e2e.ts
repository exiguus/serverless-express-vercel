import {test, expect} from '@playwright/test';

const baseURL = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;

test('has redoc', async ({page}) => {
  await page.goto(baseURL);
  await page.getByTestId('redoc').click();
  await page.waitForURL(`${baseURL}/redoc/`);
  await expect(page).toHaveTitle('Redoc');
});

test('has api section list', async ({page}) => {
  await page.goto(`${baseURL}/redoc/`);

  expect(await page.getByRole('heading', {name: 'cache'})).toBeTruthy();
  expect(await page.getByRole('heading', {name: 'info'})).toBeTruthy();
  expect(await page.getByRole('heading', {name: 'track'})).toBeTruthy();
});
