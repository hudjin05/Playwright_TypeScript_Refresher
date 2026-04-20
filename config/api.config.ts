import { ENV_CONFIG } from './env';

export const API_ENDPOINTS = {
  LOGIN: `${ENV_CONFIG.API_BASE_URL}/users/login`,
  ADD_CONTACT: `${ENV_CONFIG.API_BASE_URL}/contacts`,
  DELETE_CONTACT: (contactId: string) => `${ENV_CONFIG.API_BASE_URL}/contacts/${contactId}`,
};
