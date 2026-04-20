import { Page, Locator } from '@playwright/test';
import ElementActionsUtil from '@utils/ui/element-actions-util';

export class HeaderComponent {
  readonly page: Page;
  readonly elementActions: ElementActionsUtil;
  readonly lnkLogout: Locator;
  readonly lnkLogin: Locator;
  readonly tblContacts: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.elementActions = new ElementActionsUtil(page);
    this.lnkLogout = page.getByRole('link', { name: 'Log out' });
    this.lnkLogin = page.getByRole('link', { name: 'Log in' });
    this.tblContacts = page.locator('#myTable');
  }
  
  async clickLogoutLink(): Promise<void> {
    await this.elementActions.clickElement(this.lnkLogout);
  }

  async clickLoginLink(): Promise<void> {
     await this.elementActions.clickElement(this.lnkLogin);
  }

  async verifyLogoutLink(): Promise<boolean> {
    return await this.lnkLogout.isVisible();
  }

  async verifyLoginLink(): Promise<boolean> {
    return await this.lnkLogin.isVisible();
  }

  async verifyContactInTable(): Promise<string> {
    return await this.tblContacts.textContent() ?? '';
  }
}