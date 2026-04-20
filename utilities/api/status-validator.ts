// utilities/api/status-validator.ts
import { expect } from '@playwright/test';
import logger from '@utils/common/logger-util';

/**
 * Utility class to validate HTTP response status codes
 */
export class StatusValidator {
  /**
   * Validate that a response status matches the expected status
   * @param responseStatus - Actual HTTP status code from the response
   * @param expectedStatus - Expected HTTP status code
   */
  static validateStatus(responseStatus: number, expectedStatus: number): void {
    try {
      expect(responseStatus).toBe(expectedStatus);
      logger.info(`HTTP Status validated: ${responseStatus} `);
    } catch (error) {
      logger.error(`HTTP Status validation failed: expected ${expectedStatus}, got ${responseStatus} `);
      throw error;
    }
  }
}
