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
    extend: {
      colors: {
        "primary": "#adc6ff",
        "on-primary": "#002e6a",
        "tertiary": "#4edea3",
        "error": "#ffb4ab",
        "surface": "#0b1326",
        "surface-container-low": "#131b2e",
        "surface-container-highest": "#2d3449",
        "on-surface": "#dae2fd",
        "on-surface-variant": "#c6c6cd",
        "outline-variant": "#45464d",
      }
    },
  },
  plugins: [],
} satisfies Config