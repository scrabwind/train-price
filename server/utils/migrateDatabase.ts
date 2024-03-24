import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'

export const migrateDatabase = () => {
  try {
    const db = createClient({
      url: process.env.TURSO_CONNECTION_URL || '',
      authToken: process.env.TURSO_AUTH_TOKEN!,
    })
    const orm = drizzle(db)

    migrate(orm, {
      migrationsFolder: `./drizzle`,
    })

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
