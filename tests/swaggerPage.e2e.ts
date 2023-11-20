import {test, expect} from '@playwright/test';

test('has swagger', async ({page}) => {
  await page.goto('/');
  await page.getByTestId('swagger').click();
  await page.waitForURL(`/swagger/`);
  await expect(page).toHaveTitle('Swagger UI');
});

test('has api tag list', async ({page}) => {
  await page.goto(`/swagger/`);

  expect(await page.getByRole('heading', {name: 'cache'})).toBeTruthy();
  expect(await page.getByRole('heading', {name: 'info'})).toBeTruthy();
  expect(await page.getByRole('heading', {name: 'track'})).toBeTruthy();
});

test('has models', async ({page}) => {
  await page.goto(`/swagger`);
  expect(await page.getByRole('heading', {name: 'Models'})).toBeTruthy();
});
