import { defineConfig, devices } from '@playwright/test';
import path from 'path';
const dotenv = require('dotenv');

// Determine the environment
const validEnvs = ['dev', 'prod', 'qa']; 
const env = validEnvs.includes(process.env.NODE_ENV || '') ? process.env.NODE_ENV : 'dev';

//Load the corresponding .env file
dotenv.config({ path: path.resolve(__dirname, 'config', `.env.${env}`) });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 400000,
  expect: {
    timeout: 5000,
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  workers: 6,

  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  retries: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['allure-playwright', {
    detail: false,
    suiteTitle: false,
    stdout: false,  
    resultsDir: 'reports/allure-results',
  }]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
   use: {
    // 🎯 THIS IS THE GLOBAL WAITING TIMEOUT YOU NEED TO SET
    // Set the action timeout to 15 seconds (15000ms)
    actionTimeout: 10000,

    baseURL: process.env.BASE_URL,
    headless: true,
    video: "off",
    screenshot: "off",
    launchOptions:{
      args: ["--start-fullscreen"],
      slowMo: 500
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
        launchOptions:{
          args: ["--start-maximized"],
          slowMo: 1000
        },
      viewport: null

      },
    },
    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
        launchOptions:{
          slowMo: 1000,
        },
      viewport: {width:1920, height:1080}
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          // WebKit does not support CLI args for resizing/fullscreen
          // according to official discussions :contentReference[oaicite:1]{index=1}
          // So we rely on viewport size above
          slowMo: 1000,
        },
      },
    },

    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: 1000
        },
        viewport: null
      },
    },

    {
      name: 'edge',
      use: {
        browserName: 'chromium',
        channel: 'msedge',
        launchOptions: {
          args: ['--start-maximized'],
          slowMo: 1000,
        },
        viewport: null
      },
    },

  ],
});
