import * as dotenv from 'dotenv'
import { Setting } from '../types'

dotenv.config()

/**
 * Establish the configurations based on the environment variables.
 */
export const settings: Setting = {
  APP_NAME: process.env.APP_NAME || 'myApplication',
  APP_HOST: process.env.APP_HOST || '127.0.0.1',
  APP_PORT: Number(process.env.APP_PORT) || 3000,
  APP_ENV: process.env.NODE_ENV || 'develompent',
  DEFAULT_ADMIN_PASSWORD: process.env.DEFUALT_ADMIN_PASSWORD || 'admin',
  DEFAULT_USER_PASSWORD: process.env.DEFUALT_USER_PASSWORD || 'secret',
  AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET || null,
  PUBLIC_API_KEY_TOKEN: process.env.PUBLIC_API_KEY_TOKEN || null,
  ADMIN_API_KEY_TOKEN: process.env.ADMIN_API_KEY_TOKEN || null,
}
