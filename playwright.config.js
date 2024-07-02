const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  retries: 2,
  reporter: 'html',
  workers: 1,
  use: {
    baseURL: 'https://restful-booker.herokuapp.com/',
    trace: 'retain-on-failure',
  }
});
