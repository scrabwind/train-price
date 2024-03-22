<script setup lang="ts">
import { type TrainPrice } from '@/server/schemas'

const columns: {
  key: keyof TrainPrice
  label?:
    | 'ID'
    | Capitalize<keyof TrainPrice>
    | 'Price Image'
    | 'Whole Screenshot'
}[] = [
  { key: 'id', label: 'ID' },
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'browser', label: 'Browser' },
  { key: 'price', label: 'Price' },
  { key: 'priceScreenshot', label: 'Price Image' },
  { key: 'wholeScreenshot', label: 'Whole Screenshot' },
]
</script>

<template>
  <UTable :rows="[]" :columns="columns">
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
        color="grey"
        variant="ghost"
        class="center"
      />
    </template>
  </UTable>
</template>
