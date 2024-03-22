import type { Config } from 'drizzle-kit'

const config = useRuntimeConfig()

export default {
  schema: './server/schemas',
  out: 'drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: config.databaseUrl as string,
  },
} satisfies Config
