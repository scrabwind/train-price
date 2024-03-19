import { sql } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const trainPrice = sqliteTable('trainPrice', {
  id: integer('id').primaryKey(),
  price: integer('price', { mode: 'number' }).notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
  browser: text('browser').default('chromium').notNull(),
})

export type TrainPrice = typeof trainPrice.$inferInsert
