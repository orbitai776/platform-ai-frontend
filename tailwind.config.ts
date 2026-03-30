import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './src/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config