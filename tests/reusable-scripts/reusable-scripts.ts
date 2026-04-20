import { LoginPage } from '@pages/login-page';
import { Page } from '@playwright/test';

export class ReusableHelpers {
    private loginPage: LoginPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
    }

    async EnterCredentials(email: string, password: string): Promise<void> {
        await this.loginPage.enterEmailContactList(email);
        await this.loginPage.enterPasswordContactList(password);
    }
}