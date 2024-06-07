/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '32px',
      },
      colors: {
        'blue': '#0C0C1F',
        'dark-blue': '#030311',
        'riot-blue': '#0096A8',
        'riot-red': '#C62139',
        'gold': '#FDC80C',
        'purple': '#A45EFF',
      },
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
        serif: ['Halant', 'serif'],
      },
      boxShadow: {
        'big': '0px 4px 20px rgba(0, 0, 0, 0.3)',
      },
      dropShadow: {
        'big': '0px 4px 20px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}

