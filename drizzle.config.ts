import type { Config } from 'drizzle-kit'

export default {
  schema: './server/schemas',
  out: 'drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: '.data/db.bun.sqlite',
  },
} satisfies Config
