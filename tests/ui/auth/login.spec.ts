import { test, expect, Page } from '@hooks/web-hook';
import { HomePage } from '@pages/home-page';
import { LoginPage } from '@pages/login-page';
import { ReusableHelpers } from '@reusable-scripts/reusable-scripts';
import { ATTACH } from '@utils/common/allure-util';
import testData from '@test-data/ui/ui-test-data.json';

test.describe('Login Functionality', () => {
  test('should log in and log out successfully', { tag: ['@validLogin', '@all'] }, async ({ page }: { page: Page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const reusableHelper = new ReusableHelpers(page);
    await ATTACH.withAllureStep(page, 'Step 1 - Enter Credentials', async () => {
      await reusableHelper.EnterCredentials(testData.validUser.email, testData.validUser.password);
    });

    await ATTACH.withAllureStep(page, 'Step 2 - Click Submit Button', async () => {
      await loginPage.clickSubmitButton();
    });
  });

  test('Unsuccessful Login with invalid credentials', { tag: ['@invalidlogin', '@all'] }, async ({ page }: { page: Page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await ATTACH.withAllureStep(page, 'Step 1 - Enter Invalid Credentials', async () => {
      const reusableHelper = new ReusableHelpers(page);
      await reusableHelper.EnterCredentials(testData.InvalidUser.email, testData.InvalidUser.password);
    });

    await ATTACH.withAllureStep(page, 'Step 2 - Attempt Login', async () => {
      await loginPage.clickSubmitButton();
    });
  });
});
