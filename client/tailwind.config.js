/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-yellow': '#f8df8c',
        'background-grey': '#edf6f6',
      },
    },
  },
  plugins: [],
}