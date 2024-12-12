/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
           primary:"#090982",
           auColor:"#242699",
           auButtomColor:"#02E8FF"
          }
    },
  },
  plugins: [],
}

