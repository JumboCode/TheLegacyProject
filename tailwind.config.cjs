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
    extend: {
      boxShadow: {
        'drop-inner': 'inset 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
      }
    },
    colors: {
      'dark-teal': '#22555A',
      'teal': '#22555A',
      'off-white': '#F5F5F5',
      'taupe': '#F5F0EA',
      'nav-taupe': '#ECE6DE',
      'dark-green': '#22555A',
      'dark-gray': '#515151',
      'dark-plum': '#000022',
      'tag-rust': '#AE583C',
      'tag-tan': '#C79F7C',
      'tag-sage': '#90A699',
      'tag-gray': '#65696C',
      'light-sage': '#D3D9D6',
      ...colors,
    },
    
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
    },
  },
  plugins: [],
};