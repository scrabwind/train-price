// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  nitro: {
    experimental: {
      tasks: true,
    },
    scheduledTasks: {
      '*/30 * * * *': [
        'db:scrape:chromium',
        'db:scrape:firefox',
        'db:scrape:webkit',
      ],
    },
  },
  ui: {
    icons: ['ic'],
  },

  runtimeConfig: {
    tursoConnectionUrl: process.env.NUXT_TURSO_CONNECTION_URL,
    tursoAuthToken: process.env.NUXT_TURSO_AUTH_TOKEN,
    public: {
      basePrice: 129000,
    },
  },
})
