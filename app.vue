<script setup lang="ts">
const store = useTrainPrice()

const data: any = useState('data')

await callOnce(async () => {
  data.value = await $fetch('/api/show')
})

const handleCreate = async (_: MouseEvent) => {
  const res = await $fetch('/api/playwright')

  data.value = res
}

const handleDrop = async (_: MouseEvent) => {
  const res = await $fetch('/api/drop')

  data.value = res
}
</script>

<template>
  <div :key="row?.id" v-for="row in data">
    <span>{{ row }}</span>
  </div>

  <button @click="handleCreate">Fetch</button>
  <button @click="handleDrop">Delete</button>

  <button @click="store.fetchEvent">Store</button>
  <span>{{ store.fetchStatus }}</span>
</template>
