import type { Config } from 'drizzle-kit'

if (!process.env.TURSO_CONNECTION_URL) {
  throw new Error('TURSO_CONNECTION_URL is missing')
}

export default {
  schema: './server/schemas',
  out: 'drizzle',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config
