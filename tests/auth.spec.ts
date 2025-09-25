import { test, expect } from '@playwright/test';

test.describe('auth smoke', () => {
  test('sign in modal appears', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page.getByText(/sign in/i).first()).toBeVisible();
  });
});

