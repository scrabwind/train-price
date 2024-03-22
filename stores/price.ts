import type { AvailableBrowsers } from '@/server/types/browsers'
import type { TrainPrice } from '~/server/schemas'

export const useTrainPrice = defineStore('trainPrice', () => {
  const fetchBodyBrowser = useState<AvailableBrowsers | 'all'>(
    'bodyBrowser',
    () => 'chromium'
  )

  const trainData = useState<TrainPrice[]>('trainData', () => [])

  const config = useRuntimeConfig()

  const {
    status: fetchStatus,
    execute,
    error,
  } = useFetch('/api/scrape', {
    immediate: false,
    server: false,
    retry: false,
    method: 'post',
    query: { browser: fetchBodyBrowser },
  })

  const fetchData = async () => {
    const { data } = await useFetch<TrainPrice[]>('/api/getAll')
    trainData.value = data.value || []
  }

  const scrapePage = async (browser: AvailableBrowsers | 'all') => {
    fetchBodyBrowser.value = browser
    await execute()
    await fetchData()
  }

  const getChartData = computed(() => {
    type BrowserNames = Capitalize<AvailableBrowsers>

    type ChartDataSorted = {
      [key in AvailableBrowsers]: (number | string)[][]
    }

    const isDataEmpty = trainData.value.length === 0

    const legends: BrowserNames[] = ['Chromium', 'Firefox', 'Webkit']

    const data = trainData.value.reduce<ChartDataSorted>(
      (acc, obj) => {
        const { browser, price, timestamp } = obj
        if (!acc[browser as AvailableBrowsers]) {
          acc[browser as AvailableBrowsers] = []
        }

        acc[browser as AvailableBrowsers].push([
          timestamp,
          price - config.public.basePrice,
        ])
        return acc
      },
      { chromium: [], webkit: [], firefox: [] }
    )

    return {
      legends,
      ...data,
      isDataEmpty,
    }
  })

  return {
    fetchStatus,
    scrapePage,
    error,
    trainData,
    fetchBodyBrowser,
    fetchData,
    getChartData,
  }
})
