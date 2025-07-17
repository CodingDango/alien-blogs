/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    './docs/', 
    './my_blog/templates/**/*.html', 
  ],

  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],

  theme: {
    extend: {
      spacing: {
        'header': '3.7rem'
      },
      
      colors: {
        'my-black-300'  : '#121212',
        'my-black-250'  : '#1E1E1E',
        'my-black-200'  : '#2C2C2C',
        'my-black-100'  : '#464646',
        'my-neutral-max': '#171717',
        'my-white'      : '#EFEEEA',
        'my-orange'     : '#FE7743',
        'neon-purple'   : '#9370DB',
        'mono-neon-purple'   : '#7447D1',
        'dark-neon-purple'   : '#371C6F',
        'my-light-gray' : '#99A1AF',
        'my-lime' : '#B8DB70',
        'my-dark-grey' : '#18181b'
      },

      backgroundImage: {
        'burger-icon': "url('/static/imgs/burgerMenu.png')",
        'close-icon': "url('/static/imgs/closeIcon.png')",
      },

      fontFamily: {
        'sans': ['"Roboto"', fontFamily.sans],
        'roboto-mono': ['"Roboto Mono"', fontFamily.sans],
      },
      screens: {
        'xs': '486px'
      }
    },
  },
}