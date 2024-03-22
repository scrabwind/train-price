import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'

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
    icons: ['heroicons', 'ic'],
  },
  runtimeConfig: {
    public: {
      basePrice: 1260,
    },
  },
})
