<script setup lang="ts">
import { type TrainPrice } from '@/server/schemas'

const store = useTrainPrice()

const data = useState<TrainPrice[]>('data')

await callOnce(async () => {
  data.value = await $fetch('/api/show')
})

// const handleCreate = async (_: MouseEvent) => {
//   const res = await $fetch('/api/scrape')

//   data.value = res
// }

const handleDrop = async (_: MouseEvent) => {
  const res: TrainPrice[] = await $fetch('/api/drop')

  data.value = res
}

// const { refresh, execute } = await useFetch('/api/playwright', {
//   method: 'POST',
//   body: {
//     browser: 'webkit',
//   },
// })
</script>

<template>
  <div :key="row?.id" v-for="row in data">
    <span>{{ row.id }}</span>
    <span>{{ row.price }}</span>
    <span>{{ row.timestamp }}</span>
    <!-- <img width="200" :src="`data:image/png;base64,${row.priceScreenshot}`" /> -->
  </div>

  <!-- <button @click="handleCreate">Fetch</button> -->
  <button @click="handleDrop">Delete</button>

  <button @click="store.fetchEvent">Store</button>
  <span>{{ store.fetchStatus }}</span>
  <span>{{ store.error }}</span>
</template>
