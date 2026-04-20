import { APIRequestContext } from '@playwright/test';
import { API_ENDPOINTS } from '@config/api.config';
import { APIHelper } from '@utils/api/api-helper';

export class ContactAPI {
  private api: APIHelper;

  constructor(request: APIRequestContext) {
    this.api = new APIHelper(request);
  }

  /**
   * Create a new contact and return the API response
   */
  async createContact(contactData: any, token: string) {
    return await this.api.post(API_ENDPOINTS.ADD_CONTACT, contactData, {
      Authorization: `Bearer ${token}`
    });
  }

  /**
   * Delete a contact and return the API response
   */
  async deleteContact(contactId: string, token: string) {
    return await this.api.delete(API_ENDPOINTS.DELETE_CONTACT(contactId), {
      Authorization: `Bearer ${token}`
    });
  }
}