/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
          'color1':'#d81d26',
          'color2':'#666666',
      }
    },
  },
  plugins: [],
}

