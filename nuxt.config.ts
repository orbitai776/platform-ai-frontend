
export default defineNuxtConfig({
  ssr: true,

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

  alias: {
    '@': '.',
    '@components': './components',
    '@pages': './pages',
    '@server': './server'
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
  },

  build: {
    transpile: [],
    analyze: false
  },

  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
    }
  }
})
