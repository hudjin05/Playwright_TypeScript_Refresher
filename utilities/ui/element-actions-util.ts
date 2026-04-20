import { Locator, Page} from '@playwright/test';
import ElementWaitUtil from '@utils/ui/element-wait-util';
import logger from '@utils/common/logger-util';

class ElementActionsUtil{
    private page: Page;
    private elementWait: ElementWaitUtil

    constructor(page: Page){
        this.page = page;
        this.elementWait = new ElementWaitUtil(page);
    }

    async inputElement(selector: Locator, value: string): Promise<void> {
        await this.elementWait.waitElementToBeVisible(selector);
        try {
            const element = selector;
            await element.fill(value);
            //console.log(`Input value: ${value}`);
            logger.info(`Input value: ${value}`);
        } catch (error) {
            logger.error('Error inputting value', error);
            throw error;
        }
    }

    async clickElement(selector: Locator): Promise<void>{
        await this.elementWait.waitElementToBeEnabled(selector);
        try {
            const element = selector;

            await element.click();
            logger.info(`Clicked element successfully.`);
        } catch (error) {
            logger.error(`Error clicking element: ${error}`);
            throw error; 
        }
    }

}
export default ElementActionsUtil;