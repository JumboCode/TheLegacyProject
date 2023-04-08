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
      'dark-teal': '#22555A',
      'teal': '#22555A',
      'off-white': '#F5F5F5',
      'taupe': '#F5F0EA',
      'taupe-hover': '#E9DED1',
      'dark-green': '#22555A',
      'dark-gray': '#515151',
      'dark-plum': '#000022',
      'tag-rust': '#AE583C',
      'tag-tan': '#C79F7C',
      'tag-sage': '#90A699',
      'tag-gray': '#65696C',
      ...colors,
    },
    
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [],
};