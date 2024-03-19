import { consola } from 'consola'

import {
  type Browser,
  type Request as PlaywrightRequest,
  chromium,
} from 'playwright'

import type { TrainResponse } from '../types/trainResponse'
import { trainPrice } from '../schemas'

const handleEventListener = async (request: PlaywrightRequest) => {
  if (!request.url().includes('GetConnListPrice')) return

  const json: TrainResponse = await (await request.response())?.json()

  const res = json.list.map(list => ({
    price: list.price.price,
    train: list.trains[0],
  }))[0]

  const { trainName, arrDate, arrTime, depDate, depTime } = res.train

  if (trainName === 'rj 79 Vindobona') {
    /*
    This console log crashes up for some reason
    console.log(
      `Train ${trainName}: ${depDate} ${depTime} - ${arrDate} ${arrTime} price: ${
        res.price
      } CZK ≈≈ ${res.price * 0.17} PLN`
    )
    */
    return res.price
  }
}

export default defineEventHandler(async _event => {
  let price = 0

  let browser: Browser

  switch ([]) {
    // case 'firefox':
    //   consola.log('running on firefox')
    //   browser = await playwright.firefox.launch()
    //   break
    // case 'webkit':
    //   consola.log('running on webkit')
    //   browser = await playwright.webkit.launch()
    //   break
    // case 'chrome':
    //   consola.log('running on chrome')
    //   browser = await playwright.chromium.launch({ channel: 'chrome' })
    //   break

    default:
      consola.box('Running on chromium')
      browser = await chromium.launch()
      break
  }

  const browserContext = await browser.newContext()

  const page = await browserContext.newPage()

  page.on('request', async request => {
    const newPrice = await handleEventListener(request)
    if (newPrice) {
      price = newPrice
      page.removeListener('request', () => {})
    }
  })

  try {
    await traversePage(page)
  } catch (error) {
    consola.error('Page traverse failed')
    consola.trace(error)
  }

  if (price) {
    const database = useDrizzle()

    await database
      .insert(trainPrice)
      .values({ price: price, browser: 'chromium' })

    consola.success('Added to database')
  }

  await browser.close()

  return
})
