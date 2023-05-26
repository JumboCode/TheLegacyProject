/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'drop-inner': 'inset 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
      }
    },
    colors: {
      'dark-teal': '#22555A',
      'nav-teal': '#0C5C5C',
      'off-white': '#F5F5F5',
      'offer-white': '#F0F0F0',
      'taupe': '#F5F0EA',
      'nav-taupe': '#E8E0D5',
      'dark-taupe': '#d1c7b8',
      'dark-green': '#22555A',
      'light-sage': '#AEBDB6',
      'dark-sage': '#94A59C',
      'dark-gray': '#515151',
      'dark-plum': '#000022',
      'tag-rust': '#C16E65',
      'tag-tan': '#AB7D55',
      'tag-gold': '#BA9D4F',
      'tag-lime': '#A3A865',
      'tag-moss': '#768E64',
      'tag-teal': '#698C8A', 
      'tag-blue': '#586D87',
      'tag-violet': '#6F617F',
      'tag-rose': '#A0687F',
      ...colors,
    },
    
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
    },

    letterSpacing: {
      easy: 'letter-spacing: 0.0125em',
    }
  },
  plugins: [],
};