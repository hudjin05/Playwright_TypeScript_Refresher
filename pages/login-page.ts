import { Page, Locator } from '@playwright/test';
import ElementActionsUtil from '@utils/ui/element-actions-util';

export class LoginPage {
  readonly page: Page;
  readonly elementActions: ElementActionsUtil;
  readonly txtEmail: Locator;
  readonly txtPassword: Locator;
  readonly btnLogin: Locator;
  readonly txtEmailContactList: Locator;
  readonly txtPasswordContactList: Locator;
  readonly btnSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elementActions = new ElementActionsUtil(page);

    this.txtEmail = page.getByRole('textbox', { name: 'Email:' });
    this.txtPassword = page.getByRole('textbox', { name: 'Password:' });
    this.btnLogin = page.getByRole('button', { name: 'Log in' });
    this.txtEmailContactList = page.getByRole('textbox', { name: 'Email' });
    this.txtPasswordContactList = page.getByRole('textbox', { name: 'Password' });
    this.btnSubmit = page.getByRole('button', { name: 'Submit' });

  }

  async enterEmail(email: string): Promise<void> {
    await this.elementActions.inputElement(this.txtEmail, email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.elementActions.inputElement(this.txtPassword, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.elementActions.clickElement(this.btnLogin);
  }

  async enterEmailContactList(email: string): Promise<void> {
    await this.elementActions.inputElement(this.txtEmailContactList, email);
  }

  async enterPasswordContactList(password: string): Promise<void> {
    await this.elementActions.inputElement(this.txtPasswordContactList, password);
  }

  async clickSubmitButton(): Promise<void> {
    await this.elementActions.clickElement(this.btnSubmit);
  }
}