import { nodeResolve } from '@rollup/plugin-node-resolve'

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
        connector: 'bun-sqlite',
        options: { name: 'db' },
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
