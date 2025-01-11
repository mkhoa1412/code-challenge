/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: '0.75rem',
      xsm: '0.8125rem',
      sm: '0.875rem',
      md: '0.9375rem',
      base: '1rem', //16px
      lg: '1.125rem',
      xl: '1.25rem',
    },
    extend: {
      colors: {
        'fancy-primary': '#07819D',
        'fancy-secondary': '#F5FDFD',
        gray: {
          100: '#e7e3eb',
        },
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
      },
      screens: {
        extraLarge: '1800px',
        large: '1440px',
        extraMedium: '1200px',
        medium: '1024px',
        small: '990px',
        extraSmall: '744px',
      },
    },
  },
  plugins: [],
}