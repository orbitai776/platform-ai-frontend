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

  css: [
    '~/assets/tailwind.css'
  ],

  app: {
    head: {
      title: 'Platform AI - Orbit AI',
      htmlAttrs: {
        lang: 'vi'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/vite.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
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