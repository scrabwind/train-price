import { consola } from 'consola'

import { trainPrice } from '../schemas'

function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}

export default defineEventHandler(async _event => {
  try {
    const db = useDrizzle()

    const browsers = ['chrome', 'chromium', 'firefox', 'webkit']

    await db.insert(trainPrice).values({
      price: getRandomIntInclusive(1000, 2000),
      browser: browsers[getRandomIntInclusive(0, browsers.length)],
    })

    consola.info('Inserted row')

    return db.select().from(trainPrice).all()
  } catch (error) {
    consola.error(error)
  }
})

// export default defineEventHandler(() => {
//   console.log('Wrong path dummy')
// })
