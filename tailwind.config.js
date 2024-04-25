/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0A192F',
        'riot-blue': '#0096A8',
        'riot-red': '#C62139',
      }
    },
  },
  plugins: [],
}

