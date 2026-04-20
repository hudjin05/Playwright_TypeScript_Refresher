import { expect, Locator, Page } from '@playwright/test';
import logger from '@utils/common/logger-util';

class ElementWaitUtil{
    private page: Page;

    constructor(page: Page){
        this.page = page;

    }

    async waitElementToBeVisible(selector: Locator): Promise<Locator> {
        try {
            const element = selector;
            expect(element).toBeVisible();

            return element;
        } catch (error) {
            throw error;
        }
    }

    async waitElementToBeEnabled(selector: Locator): Promise<Locator> {
        try {
            const element = selector;
            expect(element).toBeEnabled();

            return element;
        } catch (error) {
            throw error;
        }
    }
}

export default ElementWaitUtil;