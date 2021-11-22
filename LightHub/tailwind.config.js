// Example `tailwind.config.js` file
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.sky,
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      width:{
        '2000':'2000px'
      },
      height:{
        '2000':'2000px'
      },
      maxWidth:{
        'screen':'100vw'
      },
      transitionDuration: {
        '0': '0ms',
        '1400':'1400ms',
        '1800': '1800ms',
        '3600': '3600ms',
      },
      lineHeight:{
        '12':'3rem'
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    }
  }
}