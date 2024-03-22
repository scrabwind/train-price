import { baseScrape } from '@/server/utils/baseScrape'

export default defineTask({
  meta: {
    name: 'db:scrape:firefox',
    description: 'Run through firefox page and save to database',
  },
  async run({ payload, context }) {
    try {
      await baseScrape('firefox')
      return { result: 'ok' }
    } catch (error) {
      throw error
    }
  },
})
