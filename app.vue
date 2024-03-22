<script setup lang="ts">
const store = useTrainPrice()

await callOnce(async () => {
  await store.fetchData()
})
</script>

<template>
  <UContainer as="main">
    <ThemeToggle />
    <NuxtPage />
  </UContainer>
</template>
