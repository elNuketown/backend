import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['allure-playwright'],
    ['list'],
    ['html', {     
      open: 'never',
        }],
  ],
  outputDir: 'allure-results',
});