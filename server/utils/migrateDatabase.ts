import { consola } from 'consola'
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

export const migrateDatabase = () => {
  try {
    const config = useRuntimeConfig()
    const db = new Database(config.databaseUrl)
    const orm = drizzle(db)

    migrate(orm, {
      migrationsFolder: `./drizzle`,
    })

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
