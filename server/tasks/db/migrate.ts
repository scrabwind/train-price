import { Database } from 'bun:sqlite'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { drizzle } from 'drizzle-orm/bun-sqlite'

export default defineTask({
  meta: {
    name: 'db:migrate',
    description: 'Migrate database',
  },
  run({ payload, context }) {
    try {
      const db = new Database(`${process.cwd()}/.data/db.bun.sqlite`)
      const orm = drizzle(db)

      migrate(orm, {
        migrationsFolder: `./drizzle`,
      })
      return { result: 'Success' }
    } catch (error) {
      return { result: `${error}` }
    }
  },
})
