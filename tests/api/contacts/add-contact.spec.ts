import { test, expect } from '@playwright/test';
import { API_ENDPOINTS } from '@config/api.config';
import { APIHelper } from '@utils/api/api-helper';
import { StatusValidator } from '@utils/api/status-validator';
import { HTTP_STATUS } from '@utils/api/http-status';
import { ContactAPI } from '@services/contact-api';
import testData from '@test-data/api/api-test-data.json';
import { LoginPage } from '@pages/login-page';
import { HomePage } from '@pages/home-page';
import { ATTACH } from '@utils/common/allure-util';
import { ReusableHelpers } from '@reusable-scripts/reusable-scripts';

test.describe('Contact Management', { tag: ['@api'] }, () => {
  test('Validate API created contact appears in UI', { tag: ['@all'] }, async ({ page, request }) => {
    // STEP 1: Login via API
    const api = new APIHelper(request);
    const contactApi = new ContactAPI(request);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const reusableHelper = new ReusableHelpers(page);

    let loginResponse: any;
    let loginBody: any;
    let token: string;

    await ATTACH.apiStep('Step 1 - Login via API', async () => {
      loginResponse = await api.post(API_ENDPOINTS.LOGIN, {
        email: testData.credential.email,
        password: testData.credential.password
      });
      loginBody = await loginResponse.json();
      token = loginBody.token;

      StatusValidator.validateStatus(loginResponse.status(), HTTP_STATUS.OK);

      ATTACH.attachJSON('Login API response', {
        status: loginResponse.status(),
        body: loginBody
      });
    });

    // STEP 2: Create contact using token
    let createContact: any;
    let createBody: any;

    await ATTACH.apiStep('Step 2 - Create Contact via API', async () => {
      createContact = await contactApi.createContact(testData.contact, token);
      createBody = await createContact.json();

      StatusValidator.validateStatus(createContact.status(), HTTP_STATUS.CREATED);

      ATTACH.attachJSON('Create Contact API Response', {
        status: createContact.status(),
        body: createBody
      });
    });

    await ATTACH.withAllureStep(page, 'Step 3 - Go to Login Page', async () => {
      await page.goto('');
    });

    await ATTACH.withAllureStep(page, 'Step 4 - Open UI and enter Username and Password', async () => {
      await reusableHelper.EnterCredentials(testData.credential.email, testData.credential.password);
    });

    await ATTACH.withAllureStep(page, 'Step 5 - Click Submit Button', async () => {
      await loginPage.clickSubmitButton();
    });

    await ATTACH.withAllureStep(page, 'Step 6 - Validate contact in UI', async () => {
      const tableContact = await homePage.header.verifyContactInTable();
      expect(tableContact).toContain(testData.contact.firstName + ' ' + testData.contact.lastName);
    });
  });
});