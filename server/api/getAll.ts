import { consola } from 'consola'

import { trainPrice } from '../schemas'

export default defineEventHandler(async _event => {
  try {
    const db = useDrizzle()
    return db.select().from(trainPrice).orderBy(trainPrice.timestamp)
  } catch (error) {
    consola.error(error)
  }
})
