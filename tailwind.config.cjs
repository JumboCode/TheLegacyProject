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
      'nav-taupe': '#E8E0D5',
      'dark-green': '#22555A',
      'light-sage': '#D3D9D6',
      'dark-sage': '#98ADA2',
      'dark-gray': '#515151',
      'dark-plum': '#000022',
      'tag-rust': '#B05D54',
      'tag-tan': '#AB7D55',
      'tag-gold': '#BA9D4F',
      'tag-moss': '#7F8E64',
      'tag-teal': '#698C8A',
      'tag-blue': '#516175',
      'tag-violet': '#6F617F',
      'tag-rose': '#A0687F',
      'tag-steel': '#7B6666',
      ...colors,
    },
    
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
    },
  },
  plugins: [],
};