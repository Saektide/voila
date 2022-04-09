const fallbackFonts = ['Roboto', '"Helvetica Neue"', 'Arial', 'ui-sans-serif', 'system-ui', 'sans-serif']

module.exports = {
  content: [
    'components/**/*.{vue,js}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.{js,ts}',
    'nuxt.config.{js,ts}'
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', ...fallbackFonts],
      mono: ['"JetBrains Mono"', '"Fire Code"', '"Roboto Mono"', 'monospace']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      safety: {
        blue: '#0B5CE5',
        green: '#00A056',
        orange: '#F38A2E',
        red: '#D8232C'
      },
      mono: {
        0: '#000000',
        1: '#101010',
        2: '#202020',
        3: '#303030',
        4: '#404040',
        5: '#505050',
        6: '#606060',
        7: '#808080',
        8: '#C0C0C0',
        9: '#E0E0E0',
        10: '#F0F0F0',
        11: '#F8F8F8',
        12: '#FFFFFF'
      },
      blue: {
        0: '#181C28',
        1: '#212738',
        2: '#4564CC',
        3: '#5078FD',
        4: '#7191FE',
        5: '#91AAFE',
        6: '#B1C3FF',
        7: '#D1DBFF'
      },
      red: {
        0: '#241A1A',
        1: '#492D2D',
        2: '#FF6A69',
        3: '#FF8484',
        4: '#FF9191',
        5: '#FF9E9E',
        6: '#FFC5C5',
        7: '#FFD2D2'
      },
      blurple: {
        0: '#242434',
        1: '#312F49',
        2: '#7667FF',
        3: '#8274FF',
        4: '#8E81FF',
        5: '#A59BFF',
        6: '#BDB5FF',
        7: '#D4CFFF'
      },
      pink: {
        0: '#2D2231',
        1: '#47334E',
        2: '#DD76FF',
        3: '#E38DFF',
        4: '#E8A3FF',
        5: '#EEB9FF',
        6: '#F1C4FF',
        7: '#F3CFFF'
      },
      green: {
        0: '#243228',
        1: '#30523A',
        2: '#5EFF8E',
        3: '#80FFA5',
        4: '#A2FFBB',
        5: '#C4FFD1',
        6: '#D5FFDC',
        7: '#E5FFE7'
      }
    },
    extend: {
      spacing: {
        108: '27rem',
        120: '30rem',
        132: '33rem',
        144: '36rem',
        156: '39rem',
        168: '42rem'
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite'
      },
      flex: {
        0: '0 0 auto'
      },
      minWidth: {
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem'
      },
      maxHeight: {
        'screen--md': 'calc(100vh - 12rem)'
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      borderRadius: ['hover']
    }
  }
}
