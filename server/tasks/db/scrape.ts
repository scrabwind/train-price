import { consola } from 'consola'

import playwright, {
  type Browser,
  type Request as PlaywrightRequest,
} from 'playwright'
import { type TrainResponse } from '@/server/types/trainResponse'
import { trainPrice } from '@/server/schemas'

export default defineTask({
  meta: {
    name: 'db:scrape',
    description: 'Run through page and save to database',
  },
  async run({ payload, context }) {
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
          consola.info(
            `Train ${trainName}: ${depDate} ${depTime} - ${arrDate} ${arrTime} price: ${
              res.price
            } CZK ≈≈ ${res.price * 0.17} PLN`
          )
          /**/
        return res.price
      }
    }

    const scrapePage = async () => {
      let price = 0

      let browser: Browser

      const chosenBrowser = payload?.browser as
        | 'chromium'
        | 'webkit'
        | 'firefox'

      if (chosenBrowser) {
        consola.info(`Running on ${chosenBrowser}`)
        browser = await playwright[chosenBrowser].launch()
      } else {
        consola.warn(`Browser was invalid, passed browser: ${chosenBrowser}`)
        consola.info('Running on chromium')
        browser = await playwright.chromium.launch()
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
        if (price) {
          const database = useDrizzle()

          const wholeScreenshot = await page
            .locator('article')
            .first()
            .screenshot()

          const priceScreenshot = await page
            .locator('span.split-button__btn--content')
            .first()
            .screenshot()

          await database.insert(trainPrice).values({
            price: price,
            browser: 'chromium',
            wholeScreenshot: wholeScreenshot.toString('base64'),
            priceScreenshot: priceScreenshot.toString('base64'),
          })

          consola.success('Added to database')
        }
      } catch (error) {
        consola.error('Page traverse failed')

        throw error
      } finally {
        await browser.close()
      }
    }

    try {
      await scrapePage()
      return { result: 'Success' }
    } catch (error) {
      throw error
    }
  },
})
