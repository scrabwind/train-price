import { type TrainPrice } from '../server/schemas'

export const useTrainPrice = defineStore('trainPrice', () => {
  const trainPrice = ref<TrainPrice[]>([])

  const { status: fetchStatus, execute } = useFetch('/api/playwright', {
    immediate: false,
  })

  const fetchEvent = () => execute()

  return { trainPrice, fetchStatus, fetchEvent }
})
