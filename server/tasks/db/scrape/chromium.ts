import { baseScrape } from '@/server/utils/baseScrape'

export default defineTask({
  meta: {
    name: 'db:scrape:chromium',
    description: 'Run through firefox page and save to database',
  },
  async run({ payload, context }) {
    try {
      await baseScrape('chromium')
      return { result: 'ok' }
    } catch (error) {
      throw error
    }
  },
})
