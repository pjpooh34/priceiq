import { test, expect } from '@playwright/test';

test('interactive demo runs and shows result', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /try live demo/i }).click();
  await page.getByRole('button', { name: /use sample/i }).click();
  await expect(page.getByText(/analyzing quote/i)).toBeVisible();
  await expect(page.getByText(/analysis complete/i)).toBeVisible({ timeout: 15000 });
  await expect(page.getByText(/fair price range/i)).toBeVisible();
  await expect(page.getByText(/quoted/i)).toBeVisible();
  await page.getByRole('button', { name: /see full results/i }).click();
  await expect(page.getByText(/analysis complete/i).first()).toBeVisible();
});

