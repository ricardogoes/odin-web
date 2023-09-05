/** @type {import('tailwindcss').Config} */

const { boxShadow } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const shadowBase = '0px 1px 2px rgba(16, 24, 40, 0.05)';

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      ...colors,
      linkSideBar: '#637381',
      dark: {
        900: '#101828',
      },
      primary: {
        50: '#E0F6EE',
        100: '#B2E9D4',
        200: '#7BDBB8',
        300: '#21CD9C',
        400: '#00C287',
        500: '#00B572',
        600: '#00A667',
        700: '#009359',
        800: '#00824C',
        900: '#006235'
      },
      error: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D'
      },
      warning: {
        50: '#FFFAEB',
        100: '#FEF0C7',
        200: '#FEDF89',
        300: '#FEC84B',
        400: '#FDB022',
        500: '#F79009',
        600: '#DC6803',
        700: '#B54708',
        800: '#93370D',
        900: '#7A2E0E'
      },
      success: {
        50: '#ECFDF3',
        100: '#D1FADF',
        200: '#A6F4C5',
        300: '#6CE9A6',
        400: '#32D583',
        500: '#12B76A',
        600: '#039855',
        700: '#027A48',
        800: '#05603A',
        900: '#054F31'
      }
    },
    boxShadow: ({ theme }) => ({
      ...boxShadow,
      DEFAULT: shadowBase,
      sb: '0px 1px 4px rgba(0, 0, 0, 0.12)',
      xs: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);',
      sm: '0px 3px 8px rgba(0, 0, 0, 0.08)',
      'outline-primary': `${shadowBase}, 0px 0px 0px 4px ${theme('colors.primary[100]')}`,
      'outline-secondary': `${shadowBase}, 0px 0px 0px 4px ${theme('colors.blue[100]')}`,
      'outline-error': `${shadowBase}, 0px 0px 0px 4px ${theme('colors.error[100]')}`,
      'outline-gray': `${shadowBase}, 0px 0px 0px 4px ${theme('colors.gray[100]')}`,
    }),
    extends: {
      transitionProperty: {
        'height': 'height',
      }
    }
  },
  plugins: [],
}

