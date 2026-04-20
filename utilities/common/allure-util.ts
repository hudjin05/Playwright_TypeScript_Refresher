import fs from 'fs';
import os from 'os';
import path from 'path';

import { test, Page } from '@playwright/test';

// Class to handle attaching screenshots and data to Allure reports
class AllureAttachScreenshot {
    async withAllureStep(page: Page, stepName: string, action: () => Promise<void>, data: any = null
    ): Promise<void> {
        await test.step(stepName, async () => {
            try {
                // Perform the action
                await action();
                // Generate a temporary path for the screenshot
                const TEMP_FILE_PATH = path.join(os.tmpdir(), `${stepName}.png`);

                // Capture and save the screenshot
                await page.screenshot({ path: TEMP_FILE_PATH });

                // Attach the screenshot
                const screenshot = fs.readFileSync(TEMP_FILE_PATH);
                test.info().attach(stepName, { body: screenshot, contentType: 'image/png' });

                // Delete the temporary file
                await fs.promises.unlink(TEMP_FILE_PATH);

            } catch (error) {
                // On failure, take a screenshot and attach it
                const TEMP_FILE_PATH = path.join(os.tmpdir(), `${stepName}-failure.png`);
                await page.screenshot({ path: TEMP_FILE_PATH });

                const screenshot = fs.readFileSync(TEMP_FILE_PATH);
                test.info().attach(`${stepName} Failure Screenshot`, { body: screenshot, contentType: 'image/png' });

                // Delete the temporary file
                await fs.promises.unlink(TEMP_FILE_PATH);

                // Rethrow the error to let Playwright handle it
                throw error;
            }
        });
    }

    async apiStep(stepName: string, action: () => Promise<void>, attachment?: { name: string; body: any; contentType?: string }
  ): Promise<void> {
    await test.step(stepName, async () => {
      try {
        await action();
        if (attachment) {
          test.info().attach(attachment.name, {
            body: typeof attachment.body === 'string' ? attachment.body : JSON.stringify(attachment.body, null, 2),
            contentType: attachment.contentType ?? 'application/json',
          });
        }
      } catch (error) {
        test.info().attach(`${stepName} - Error`, { body: String(error), contentType: 'text/plain' });
        throw error;
      }
    });
  }

  /**
   * Attach arbitrary JSON to Allure report
   * @param name Attachment name
   * @param json JSON data to attach
   */
  attachJSON(name: string, json: unknown) {
    test.info().attach(name, { body: JSON.stringify(json, null, 2), contentType: 'application/json' });
  }
}

export const ATTACH = new AllureAttachScreenshot();


