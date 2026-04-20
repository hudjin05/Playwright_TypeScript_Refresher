import { APIRequestContext, APIResponse } from '@playwright/test';
import testData from '@test-data/api/api-test-data.json';

export class APIHelper {
  private client: APIRequestContext;

  constructor(client: APIRequestContext) {
    this.client = client;
  }

  async get(
    url: string,
    headers: Record<string, string> = {}
  ): Promise<APIResponse> {
    return this.client.get(url, { headers });
  }

  async post(
    url: string,
    data: object,
    headers: Record<string, string> = {}
  ): Promise<APIResponse> {

    return this.client.post(url, { data, headers });
  }

  async delete(
    url: string,
    headers: Record<string, string> = {}
  ): Promise<APIResponse> {
    return this.client.delete(url, { headers });
  }
}
