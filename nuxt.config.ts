export default defineNuxtConfig({
  ssr: true,

  runtimeConfig: {
    public: {
      gatewayUrl: process.env.VITE_GATEWAY_URL
    }
  },

  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
  ],

  app: {
    head: {
      title: 'Orbit AI',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/vite.svg' }
      ]
    }
  },

  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
    minify: true,
    vercel: {
      functions: {
        maxDuration: 10
      }
    }
  }
})