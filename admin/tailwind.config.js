/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        rounded: ["'M PLUS Rounded 1c'", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],

      },
      backgroundColor : {
        'base' : '#ffffff'
      }

    },
  },
  plugins: [],
}