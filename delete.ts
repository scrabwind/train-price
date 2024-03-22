import { rm } from 'node:fs/promises'

if (import.meta.main) {
  await rm('.data', { force: true, recursive: true })
  await rm('drizzle', { force: true, recursive: true })
}
