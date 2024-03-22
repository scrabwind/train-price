<script setup lang="ts">
import { type TrainPrice } from '@/server/schemas'

const store = useTrainPrice()

type ColumnKeys = keyof TrainPrice

type TableColumn =
  | Capitalize<
      Exclude<ColumnKeys, 'id' | 'priceScreenshot' | 'wholeScreenshot'>
    >
  | 'ID'
  | 'Price Image'
  | 'Whole Screenshot'

const columns: {
  key: keyof TrainPrice
  label?: TableColumn
}[] = [
  { key: 'id', label: 'ID' },
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'browser', label: 'Browser' },
  { key: 'price', label: 'Price' },
  { key: 'priceScreenshot', label: 'Price Image' },
  { key: 'wholeScreenshot', label: 'Whole Screenshot' },
]

// const handleCreate = async (_: MouseEvent) => {
//   const res = await $fetch('/api/scrape')

//   data.value = res
// }

const handleDrop = async (_: MouseEvent) => {
  await $fetch('/api/drop')
}

// const { refresh, execute } = await useFetch('/api/playwright', {
//   method: 'POST',
//   body: {
//     browser: 'webkit',
//   },
// })
const handleWholeScreenshotClick = (screenshot: string) => {
  const img = new Image()
  img.src = `data:image/png;base64,${screenshot}`

  const newWindow = window.open('')
  newWindow?.document.write(img.outerHTML)
  newWindow?.document.close()
}
</script>

<template>
  <!-- <div :key="row?.id" v-for="row in data">
    <span>{{ row.id }}</span>
    <span>{{ row.price }}</span>
    <span>{{ row.timestamp }}</span>
    <!-- <img width="200" :src="`data:image/png;base64,${row.priceScreenshot}`" /> -->
  <!-- </div> -->
  <PriceChart />
  <UTable :rows="store?.trainData" :columns="columns">
    <template #priceScreenshot-data="{ row }">
      <img
        v-if="row.priceScreenshot"
        :src="`data:image/png;base64,${row.priceScreenshot}`"
      />
    </template>
    <template #wholeScreenshot-data="{ row }">
      <UButton
        v-if="row.wholeScreenshot"
        icon="i-ic-baseline-attachment"
        color="gray"
        variant="ghost"
        class="center"
        @click="() => handleWholeScreenshotClick(row.wholeScreenshot)"
      />
    </template>
  </UTable>

  <UButton color="teal" @click="() => store.scrapePage('chromium')"
    >Scrape Chromium</UButton
  >
  <UButton color="orange" @click="() => store.scrapePage('firefox')"
    >Scrape Firefox</UButton
  >
  <UButton color="blue" @click="() => store.scrapePage('webkit')"
    >Scrape Webkit</UButton
  >
  <UButton @click="() => store.scrapePage('all')">Multiple scrapes</UButton>
  <UButton @click="handleDrop">Delete</UButton>
</template>
