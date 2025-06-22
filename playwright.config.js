import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['allure-playwright'],
  ],
  outputDir: 'allure-results',
});