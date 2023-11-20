import {test, expect} from '@playwright/test';

test('has redoc', async ({page}) => {
  await page.goto('/');
  await page.getByTestId('redoc').click();
  await page.waitForURL(`/redoc/`);
  await expect(page).toHaveTitle('Redoc');
});

test('has api section list', async ({page}) => {
  await page.goto(`/redoc/`);

  expect(await page.getByRole('heading', {name: 'cache'})).toBeTruthy();
  expect(await page.getByRole('heading', {name: 'info'})).toBeTruthy();
  expect(await page.getByRole('heading', {name: 'track'})).toBeTruthy();
});
