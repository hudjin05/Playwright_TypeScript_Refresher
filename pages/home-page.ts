import { Page } from '@playwright/test';
import { HeaderComponent } from '@pages/components/header-component';

export class HomePage {
  readonly page: Page;
  readonly header: HeaderComponent;  

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
  }

}