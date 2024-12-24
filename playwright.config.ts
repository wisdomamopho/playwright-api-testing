import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 30000, // 30 seconds timeout for each test
  retries: 2, // Retry failed tests up to 2 times
  use: {
    baseURL: 'http://localhost:3000', // Set your REST API base URL
    headless: true, // Run tests in headless mode
    trace: 'on', // Enable tracing
  },
  testDir: './tests', // The directory where your Playwright tests live
});