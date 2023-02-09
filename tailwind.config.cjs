/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  // safelist: [
  //   {
  //     pattern: /-*/,
  //   }
  // ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      'green': '#22555A',
      'off-white': '#f5f5f5', 
      'beige': '#F5F0EA',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
};
