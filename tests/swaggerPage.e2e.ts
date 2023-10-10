import {test, expect} from '@playwright/test';

const baseURL = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;

test('has swagger', async ({page}) => {
  await page.goto(baseURL);
  await page.getByTestId('swagger').click();
  await page.waitForURL(`${baseURL}/swagger/`);
  await expect(page).toHaveTitle('Swagger UI');
});

test('has api tag list', async ({page}) => {
  await page.goto(`${baseURL}/swagger/`);

  expect(await page.getByRole('heading', {name: 'cache'})).toBeTruthy();
  expect(await page.getByRole('heading', {name: 'info'})).toBeTruthy();
  expect(await page.getByRole('heading', {name: 'track'})).toBeTruthy();
});

test('has models', async ({page}) => {
  await page.goto(`${baseURL}/swagger`);
  expect(await page.getByRole('heading', {name: 'Models'})).toBeTruthy();
});
