module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: '#1E3A8A',
          secondary: '#3B82F6',
          accent: '#F59E0B',
          neutral: '#F3F4F6',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
        },
        boxShadow: {
          card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: [
    ],
};