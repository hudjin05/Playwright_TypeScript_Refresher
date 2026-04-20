# Playwright Typescript

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Running Tests](#running-tests)
- [Parallel Execution Configuration](#parallel-execution-configuration)
- [Firefox and WebKit Screen Size Configuration](#firefox-and-webkit-screen-size-configuration)
- [Reporting and Logs](#reporting-and-logs)
- [Exclude Test tags that will not be executed in Production environment](#exclude-test-tags-that-will-not-be-executed-in-production-environment)

## Introduction
Playwright is a powerful, modern, and open-source automation framework developed by Microsoft that allows you to automate web applications across multiple browsers. It is designed to provide reliable end-to-end testing for web applications, supporting major browsers such as Chromium, Firefox, and WebKit (Safari). Playwright is known for its robust API, which can be used for testing, web scraping, and automating tasks across different platforms.

## Features
- **Cross-browser support** (Chromium, Firefox, WebKit)
- **Page Object Model (POM) implementation**
- **Screenshot capture for every test**
- **Test data management using JSON files**
- **Comprehensive reports and logs for test execution**
- **Playwright Codegen**: Automatically generate test scripts by recording user interactions with the browser.

## Installation
 **Pre-requisites:**
 1. **Install Node.js and npm**  
    - Download and install Node.js, which also installs npm (Node Package Manager).
 2. **Verify installations**  
   _Run the following commands in the terminal to confirm that Node.js and npm are successfully installed:_
   ```
   node -v
   npm -v
   ```
**Installation Steps:**
 1. Clone the Repository to your local machine:
```
- git clone https://github.com/hudjin05/Playwright_Demo_Web_Shop.git
- cd your-repo
```

 2. Open Command Prompt
Navigate to the project directory

 3. Install All Dependencies. In the project directory, install the code below:
```
npm install
```
**Configuration:**
```
· Playwright Configuration: Modify the playwright.config.ts test timeout, retries and other Playwright-specific settings.
· Environment Variables: Use .env files to manage environment URL.
```

## Folder Structure
  ```
Main Folder Directory
├── config/                   # Environment and Configuration
│   ├── allure.environment.properties
│   ├── api.config.ts
│   └── env.ts
├── hooks/                    # Web-Hooks (Initialize and Teardown)
│   └── web-hook.ts
├── logs/                     # Log Files for test execution
├── pages/                    # Page Objects
│   ├── home-page.ts
│   ├── login-page.ts
│   └── components/
│       └── header-component.ts
├── playwright-report/        # Playwright HTML reports
│   ├── index.html
│   └── data/
├── reports/                  # Allure reports and results
│   ├── allure-reports/
│   │   └── index.html
│   └── allure-results/
│       └── (test result files)
├── services/                 # API services
│   ├── auth-api.ts
│   └── contact-api.ts
├── test-data/                # Test Data for test execution
│   ├── api/
│   │   └── api-test-data.json
│   └── ui/
│       └── ui-test-data.json
├── test-results/             # Test execution results
│   └── (test result folders)
├── tests/                    # Test scripts
│   ├── api/
│   ├── reusable-scripts/
│   └── ui/
├── utilities/                # Utility functions
│   ├── api/
│   ├── common/
│   └── ui/
├── package.json              # Project metadata and dependencies
├── playwright.config.ts      # Playwright configuration
├── README.md                 # Project documentation
└── tsconfig.json             # TypeScript configuration
  ```

## Running Tests

Open the Command Prompt, navigate to the project directory, and execute the following command to set the environment:

For Windows
```
SET NODE_ENV=dev
```
For Macbook
```
export NODE_ENV=dev
```

To run all tests, use this command:
```
npx playwright test
```
To run a specific test spec, use the following commands:
```
npx playwright test /ui/login.spec --project=chrome
```

To run a specific test with tags:
```
npx playwright test -g "@validlogin" --project=chrome
```
To run all tests in a different environment, use the following commands:

For Windows
```
SET NODE_ENV=dev
```
For Macbook
```
export NODE_ENV=dev
```

To run all tests in a different browsers, use the following commands:
```
npx playwright test -g "@validlogin" --project=chrome
npx playwright test -g "@validlogin" --project=edge
npx playwright test -g "@validlogin" --project=firefox
```

### Running Tests in UI Mode
To open Playwright's UI mode for running tests interactively, use the following command:
```
npx playwright test --ui
```
When you want to run a specific test or scenario, simply click the play ▶️ icon. The system will then initiate the browser session using the selected configuration and execute the chosen test.

## Parallel Execution Configuration
To enable or configure parallel execution of tests, follow these steps:
1. Open the `playwright.config.ts` file.
2. Locate the `workers` property. By default, it is set to `4`:
   ```typescript
   workers: 4,
   ```
3. Update the value of `workers` to the desired number of parallel workers. For example:
   ```typescript
   workers: 6, // Run tests with 6 parallel workers
   ```
   The recommended value depends on your system's CPU cores and available resources.

## Firefox and WebKit Screen Size Configuration
For Firefox and WebKit execution, ensure that the screen size is updated based on your machine's screen resolution. To do this:

### Firefox
1. Open the `playwright.config.ts` file.
2. Locate the `firefox` project configuration.
3. Update the `viewport` property to match your machine's screen size. For example:
   ```typescript
   {
     name: 'firefox',
     use: { 
       browserName: 'firefox',
       launchOptions: {
         args: ["--start-fullscreen"],
         slowMo: 1000,
       },
       viewport: { width: 1920, height: 1080 } // Update this based on your screen size
     },
   },
   ```

### WebKit
1. Open the `playwright.config.ts` file.
2. Locate the `webkit` project configuration.
3. Update the `viewport` property to match your machine's screen size. For example:
   ```typescript
   {
     name: 'webkit',
     use: {
       ...devices['Desktop Safari'],
       viewport: { width: 1920, height: 1080 }, // Update this based on your screen size
       launchOptions: {
         slowMo: 1000,
       },
     },
   },
   ```

## Reporting and Logs
- Allure-results: These results are typically in the form of JSON files and contain detailed information about each test, including test steps, statuses, attachments, and other metadata. To generate the report to report/allure-report folder:
```
allure generate reports/allure-results --single-file --output reports/allure-reports --clean
```
- Logs: Logs are stored in the logs/ folder.

