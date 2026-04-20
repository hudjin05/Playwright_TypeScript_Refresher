import { APIRequestContext } from '@playwright/test';
import { API_ENDPOINTS } from '@config/api.config';
import { APIHelper } from '@utils/api/api-helper';
import { parseResponse } from '@utils/api/response-parser';

export class AuthAPI {
  private api: APIHelper;

  constructor(request: APIRequestContext) {
    this.api = new APIHelper(request);
  }

  /**
   * Login and return both HTTP status and parsed body
   */
  async login(email: string, password: string): Promise<{ status: number; body: any }> {
    const response = await this.api.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    const body = await parseResponse(response);

    return {
      status: response.status(), // HTTP status code
      body,                     // parsed body (JSON or text)
    };
  }



}
