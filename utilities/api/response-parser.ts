import { APIResponse } from '@playwright/test';

export async function parseResponse<T>(
  response: APIResponse
): Promise<T> {
  const contentType = response.headers()['content-type'] ?? '';

  if (response.status() === 204) {
    return {} as T;
  }

  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  const text = await response.text();
  return { message: text } as T;
}
