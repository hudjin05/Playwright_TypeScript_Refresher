import { test as base, expect, Page, TestInfo } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import os from 'os';
import logger from '@utils/common/logger-util';

declare global {
    var TEST_NAME: string;
    var DESCRIBE_NAME: string;
    var api_token_id: string;
    var api_token: string;
    var api_userId: string;
}

// Extend the base test with hooks
const test = base.extend({});

// Get friendly OS name
const getOSName = (): string => {
    const platform = process.platform;
    const arch = process.arch;
    const platformMap: { [key: string]: string } = {
        win32: 'Windows',
        darwin: 'macOS',
        linux: 'Linux'
    };
    return `${platformMap[platform] || platform} (${arch})`;
};

// Track if environment file has been created
let environmentCreated = false;

// Track if executor file has been created
let executorCreated = false;
// Create Allure environment file dynamically on first test
const createEnvironmentFile = (browserName: string): void => {
    if (environmentCreated) return;
    
    const resultsDir = path.join(process.cwd(), 'reports/allure-results');
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }

    const environmentContent = `Environment=${process.env.NODE_ENV || 'dev'}
    Browser=${browserName}
    OS=${getOSName()}
    Node Version=${process.version}`;

    fs.writeFileSync(path.join(resultsDir, 'environment.properties'), environmentContent);
    console.log(`Allure environment configured for ${browserName}`);
    environmentCreated = true;
};

// Create Allure executor.json file so Allure UI shows an "Executors" section
const createExecutorFile = (browserName: string): void => {
    if (executorCreated) return;

    const resultsDir = path.join(process.cwd(), 'reports/allure-results');
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }
    // build executor fields similar to the Java snippet provided
    const userInfo = (() => {
        try { return os.userInfo().username; } catch { return process.env.USER || process.env.USERNAME || 'local'; }
    })();
    const host = os.hostname();
    const formattedUser = userInfo;

    // Use a readable date for the buildName
    const dateStr = new Date().toISOString().split('T')[0];
    const buildName = process.env.CI_BUILD_NAME || `Playwright Smoke Test - ${dateStr}`;

    // Point reportUrl to the local Playwright HTML report if present (fallback to empty)
    const localReportPath = path.join(process.cwd(), 'playwright-report', 'index.html');
    const reportPathExists = fs.existsSync(localReportPath);
    const reportPath = reportPathExists ? localReportPath : '';
    const reportUrl = reportPath ? `file:///${reportPath.replace(/\\/g, '/')}` : '';

    const executor = {
        name: `${formattedUser} (${host})`,
        type: 'local',
        url: process.env.CI_URL || '',
        buildOrder: process.env.BUILD_NUMBER || '',
        buildName,
        reportName: 'Allure Report',
        reportUrl
    };

    fs.writeFileSync(path.join(resultsDir, 'executor.json'), JSON.stringify(executor, null, 2));
    executorCreated = true;
};

// Function to extract test details (describe and test name) from TestInfo
export function extractDescribeDetails(testInfo: TestInfo): { describeName: string; testName: string } {
    const titlePath: string[] = testInfo.titlePath;
    let describeName: string = titlePath[1] || 'No describe';
    let testName: string = testInfo.title;

    // Trim the describeName if the '@' symbol is present
    if (describeName.includes('@')) {
        describeName = describeName.split('@')[0].trim();
    }

    // Trim the testName if the '@' symbol is present
    if (testName.includes('@')) {
        testName = testName.split('@')[0].trim();
    }

    return { describeName, testName };
}

// Hook to execute before all tests in the suite
test.beforeAll(async (): Promise<void> => {
    logger.info('Test Suite is Starting');
    logger.info(`URL is ${process.env.BASE_URL}`);
});

// Global hooks
test.beforeEach(async ({ page }: { page: Page }, testInfo: TestInfo): Promise<void> => {
  
    const { describeName, testName } = extractDescribeDetails(testInfo);
    global.TEST_NAME = testName;
    global.DESCRIBE_NAME = describeName;

    // Create environment file with actual browser name on first test
    const browserName = testInfo.project?.name || 'Unknown';
    createEnvironmentFile(browserName);
    // Create executor.json so Allure shows Executors section
    createExecutorFile(browserName);

    //loggingUtility.logMessage('info', `The test is running: ${testName}`);
    logger.info(`The test is running: ${testName}`);

    logger.info('>>> Navigating to homepage...');
    await page.goto('/');
});



test.afterEach(async ({ page }: { page: Page }, testInfo: TestInfo): Promise<void> => {
  console.log('info', `The test completed successfully: ${global.TEST_NAME}`);

});

test.afterAll(async (): Promise<void> => {
    console.log('info', `The Suite is completed: ${global.TEST_NAME}`);
});



export { test, expect, Page };
