/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'ui-sans-serif', 'system-ui'], 
        oswald: ['Oswald', 'sans-serif'],
        roboto_slab: ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

