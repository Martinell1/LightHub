// Example `tailwind.config.js` file
const { orange } = require('tailwindcss/colors')
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.sky,
      red: colors.rose,
      pink: colors.fuchsia,
      yellow:colors.yellow,
      indigo:colors.indigo,
      green:colors.green,
      orange:colors.orange,
      cyan:{
        dark:'#0097A7',
        light:'#B2EBF2',
        primary:'#00BCD4',
        accent:'#00BCD4'
      },
      divider:'#BDBDBD',
      first:'#212121',
      second:'#757575',
      bg:'#f4f5f5',
      white:'#FFFFFF'
    },
    fontFamily: {
      sans: ['sans-serif'],
    },
    extend: {
      inset:{
        '1/5': '20%',
      },
      minWidth:{
        '20':"5rem",
        '700':'700px',
      },
      width:{
        '100':'25rem',
        '112':'28rem',
        '120':'30rem',
        '140':'35rem',
        '260':'260px',
        '280':'280px',
        '700':'700px',
        '900':'900px',
        '1000':'1000px',
        '1200':'1200px',
        '2000':'2000px'
      },
      maxWidth:{
        '180':'45rem',
        'screen':'100vw'
      },
      minHeight:{
        '36px':'36px',
        '30':'120px',
        '60':'15rem',
      },
      height:{
        '2000':'2000px'
      },
      margin:{
        '5px':'5px',
        '19':'76px',
        '20p':'20px',
        '100':'25rem',
        '112':'28rem',
        '148':'37rem',
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