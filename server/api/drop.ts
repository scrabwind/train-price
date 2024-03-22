import { consola } from 'consola'

import { trainPrice } from '../schemas'

export default defineEventHandler(async _event => {
  try {
    const db = useDrizzle()

    // await db.delete(trainPrice)

    return db.select().from(trainPrice).all()
  } catch (error) {
    consola.error(error)
  }
})
