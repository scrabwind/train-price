// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  nitro: {
    experimental: {
      tasks: true,
      database: true,
    },
    database: {
      default: {
        connector: 'libsql-web',
        options: {
          url: process.env.TURSO_CONNECTION_URL,
          authToken: process.env.TURSO_AUTH_TOKEN,
        },
      },
    },
  },
  ui: {
    icons: ['ic'],
  },
  runtimeConfig: {
    databaseFile: '',
    public: {
      basePrice: 129000,
    },
  },
})
