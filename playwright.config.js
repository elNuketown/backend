module.exports = {
  timeout: 30_000,
  testDir: 'tests',
  reporter: [
    ['allure-playwright'],
    ['html', { open: 'never' }],
  ],
  use: {
    trace: 'on-first-retry',
  },
};