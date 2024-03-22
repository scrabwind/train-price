import { sql } from 'drizzle-orm'
import { sqliteTable, integer, text, blob } from 'drizzle-orm/sqlite-core'

export const trainPrice = sqliteTable('trainPrice', {
  id: integer('id').primaryKey().notNull(),
  price: integer('price', { mode: 'number' }).notNull(),
  timestamp: text('timestamp')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  browser: text('browser').default('chromium').notNull(),
  wholeScreenshot: text('wholeScreenshot'),
  priceScreenshot: text('priceScreenshot'),
})

export type TrainPrice = typeof trainPrice.$inferSelect
