/**
 * Interface to the application related configuration.
 */
export interface Setting {
  APP_NAME: string
  APP_HOST: string
  APP_PORT: number
  APP_ENV: string
  DEFAULT_ADMIN_PASSWORD: string
  DEFAULT_USER_PASSWORD: string
  AUTH_JWT_SECRET: string | null
  PUBLIC_API_KEY_TOKEN: string | null
  ADMIN_API_KEY_TOKEN: string | null
}
