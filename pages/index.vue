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

const handleDrop = async (_: MouseEvent) => {
  await $fetch('/api/drop')
}

const handleWholeScreenshotClick = (screenshot: string) => {
  const img = new Image()
  img.src = `data:image/png;base64,${screenshot}`

  const newWindow = window.open('')
  newWindow?.document.write(img.outerHTML)
  newWindow?.document.close()
}
</script>

<template>
  <PriceChart v-if="!store.getChartData.isDataEmpty" />
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

  <dir class="p-8 flex justify-between">
    <UButton color="blue" @click="() => store.scrapePage('chromium')"
      >Scrape Chromium</UButton
    >
    <UButton color="orange" @click="() => store.scrapePage('firefox')"
      >Scrape Firefox</UButton
    >
    <UButton color="teal" @click="() => store.scrapePage('webkit')"
      >Scrape Webkit</UButton
    >
    <UButton @click="() => store.scrapePage('all')">Multiple scrapes</UButton>
    <UButton disabled color="red" @click="handleDrop">Delete</UButton>
  </dir>
</template>
