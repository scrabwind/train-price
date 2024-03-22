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
    const legends = ['Chromium', 'Firefox', 'Webkit']
    const chromium = trainData.value
      .filter(v => v.browser === 'chromium')
      .map(v => v.price)
    const firefox = trainData.value
      .filter(v => v.browser === 'firefox')
      .map(v => v.price)
    const webkit = trainData.value
      .filter(v => v.browser === 'webkit')
      .map(v => v.price)

    const chromiumTest = trainData.value
      .filter(v => v.browser === 'chromium')
      .map(v => [v.timestamp, v.price])
    const firefoxTest = trainData.value
      .filter(v => v.browser === 'firefox')
      .map(v => [v.timestamp, v.price])
    const webkitTest = trainData.value
      .filter(v => v.browser === 'webkit')
      .map(v => [v.timestamp, v.price])

    const times = trainData.value.map(v => v.timestamp)

    type ChartDataSorted = {
      [key: string]: (number | string)[][]
    }

    const test1 = trainData.value.reduce<ChartDataSorted>((acc, obj) => {
      const { browser, price, timestamp } = obj
      if (!acc[browser]) {
        acc[browser] = []
      }
      acc[browser].push([
        timestamp,
        price - ((config.public.basePrice as number) || 0),
      ])
      return acc
    }, {})

    return {
      legends,
      chromium,
      firefox,
      webkit,
      times,
      chromiumTest,
      firefoxTest,
      webkitTest,
      test1,
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
