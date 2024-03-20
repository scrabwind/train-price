import { opendir, mkdir } from 'node:fs/promises'
import { migrateDatabase } from '@/server/utils/migrateDatabase'
import { consola } from 'consola'

if (import.meta.main) {
  await opendir('./.data').catch(async () => {
    await mkdir('./.data')
  })
  try {
    migrateDatabase()
    consola.success('Successfully migrated database')
  } catch (error) {
    throw error
  }
}
