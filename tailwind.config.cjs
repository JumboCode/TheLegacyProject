/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'drop-inner': 'inset 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
      }
    },
    screens: {
      xs: '320px',
      sm: '680px',
      md: '900px',
      lg: '1280px',
      xl: '1480px'
    },
    borders: {
      test: 'border-4 border-red-400 border-dashed'
    },
    colors: {
      'dark-teal': '#22555A',
      'nav-teal': '#0C5C5C',
      'light-teal': '#a7bfbf', 
      'off-white': '#F5F5F5',
      'tan': '#F5F0EA',
      'med-tan': '#E8E0D5',
      'dark-tan': '#d4ccc1',
      'dark-green': '#22555A',
      'offer-white': '#F0F0F0',
      'taupe': '#F5F0EA',
      'nav-taupe': '#E8E0D5',
      'dark-taupe': '#D1C7B8',
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
      easy: '.015em',
    },

    screen: {
      'xs': '320px'
    }
  },
  plugins: [],
});