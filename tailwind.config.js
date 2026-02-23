/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brass: {
          50: '#f8f5f0',
          500: '#c4956a',
          600: '#b38a5e',
        },
      },
    },
  },
  plugins: [],
}