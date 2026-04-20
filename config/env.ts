import path from 'path';
import dotenv from 'dotenv';

const ENV = process.env.NODE_ENV ?? 'dev';

dotenv.config({
  path: path.resolve(__dirname, `.env.${ENV}`),
});

export const ENV_CONFIG = {
  API_BASE_URL: process.env.BASE_URL!,
};
