/**
 * Playwright Test Configuration
 * Defines:
 * - Test directory structure and execution settings
 * - Browser configuration (Chromium)
 * - Timeout values and retry logic
 * - Reporter output formats (HTML + JSON)
 * - Environment-driven behavior (BASE_URL, headless mode)
 */

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: Number(process.env.RETRIES) || 0,
  workers: Number(process.env.WORKERS) || 1,
  
  reporter: [
    ['html', { open: process.env.REPORT_OPEN || 'never' }],
    ['json', { outputFile: 'test-results.json' }]
  ],
  
  use: {
    baseURL: process.env.BASE_URL || 'https://www.autocash.ma',
    trace: 'on-first-retry',
    screenshot: process.env.SCREENSHOT as any || 'only-on-failure',
    video: process.env.VIDEO as any || 'retain-on-failure',
    headless: process.env.HEADLESS === 'true',
    actionTimeout: Number(process.env.ACTION_TIMEOUT) || 10000,
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 30000,
  },
  
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});