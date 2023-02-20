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
      'dark-green': '#22555A',
      'off-white': '#f5f5f5',
      'dark-gray': '#515151',
      'dark-plum': '#000022',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
};
