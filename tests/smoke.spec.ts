import { test, expect } from '@playwright/test';

test('homepage loads and has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Global Rescue Mission/);
  await expect(page.locator('main')).toBeVisible();
});

test('404 page exists', async ({ page }) => {
  const response = await page.goto('/nonexistent-page');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('404');
});

test('admin page is accessible', async ({ page }) => {
  await page.goto('/admin');
  await expect(page.locator('body')).toBeVisible();
});
