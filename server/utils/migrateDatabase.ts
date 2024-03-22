import { consola } from 'consola'
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'

export const migrateDatabase = () => {
  try {
    const db = new Database(process.env.DATABASE_URL)
    const orm = drizzle(db)

    migrate(orm, {
      migrationsFolder: `./drizzle`,
    })

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
