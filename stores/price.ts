import { type TrainPrice } from '../server/schemas'

export const useTrainPrice = defineStore('trainPrice', () => {
  const trainPrice = useState<TrainPrice[]>('trainPrice', () => [])

  const {
    status: fetchStatus,
    execute,
    error,
  } = useFetch('/api/scrape', {
    immediate: false,
    server: false,
    retry: false,
    method: 'post',
    body: { browser: 'webkit' },
  })

  const fetchEvent = async () => await execute()

  return { trainPrice, fetchStatus, fetchEvent, error }
})
