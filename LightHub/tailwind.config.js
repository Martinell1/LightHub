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
      inset:{
        '1/5': '20%',
      },
      width:{
        '100':'25rem',
        '112':'28rem',
        '120':'30rem',
        '140':'35rem',
        '260':'260px',
        '280':'280px',
        '700':'700px',
        '1000':'1000px',
        '1200':'1200px',
        '2000':'2000px'
      },
      height:{
        '2000':'2000px'
      },
      maxWidth:{
        'screen':'100vw'
      },
      margin:{
        '19':'76px',
        '20p':'20px',
        '100':'25rem',
        '112':'28rem',
      },
      padding:{
        '19':'76px',
      },
      transitionDuration: {
        '0': '0ms',
        '1400':'1400ms',
        '1800': '1800ms',
        '3600': '3600ms',
      },
      lineHeight:{
        '12':'3rem',
        '16':'4rem'
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