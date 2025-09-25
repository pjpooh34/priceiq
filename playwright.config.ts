import { defineConfig } from '@playwright/test';

const baseURL = process.env.E2E_BASE_URL || 'https://web-rose-six-25.vercel.app';

export default defineConfig({
  use: {
    baseURL,
    headless: true,
  },
  timeout: 60_000,
});

