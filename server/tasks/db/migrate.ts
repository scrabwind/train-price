import { migrateDatabase } from '~/server/utils/migrateDatabase'

export default defineTask({
  meta: {
    name: 'db:migrate',
    description: 'Migrate database',
  },
  run({ payload, context }) {
    try {
      useDrizzle()

      migrateDatabase()
      return { result: 'Success' }
    } catch (error) {
      throw error
    }
  },
})
