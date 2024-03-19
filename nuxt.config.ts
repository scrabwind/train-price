// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  nitro: {
    experimental: {
      tasks: true,
      database: true,
    },
    database: {
      default: {
        connector: 'bun-sqlite',
        options: { name: 'db' },
      },
    },
  },
})
