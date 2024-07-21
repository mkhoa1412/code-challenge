import { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          base: 'rgba(22, 137, 252, 1)',
          light: 'rgba(210, 232, 255, 0.7)',
          disable: 'rgba(22, 137, 252, 0.5)',
        },
        secondary: {
          orange: 'rgba(255, 201, 173, 1)',
          purple: 'rgba(212, 201, 255, 1)',
          blue: 'rgba(186, 234, 255, 1)',
          green: 'rgba(194, 238, 214, 1)',
          yellow: 'rgba(255, 225, 166, 1)',
          red: 'rgba(255, 144, 144, 1)',
        },
        neutral: {
          '00': 'rgba(255, 255, 255, 1)',
          '01': 'rgba(252, 252, 253, 1)',
          '02': 'rgba(244, 245, 246, 1)',
          '03': 'rgba(207, 206, 210, 1)',
          '04': 'rgba(161, 161, 168, 1)',
          '05': 'rgba(141, 141, 148, 1)',
          '06': 'rgba(57, 60, 63, 1)',
          '07': 'rgba(29, 32, 34, 1)',
          '08': 'rgba(18, 19, 21, 1)',
        },
        status: {
          progress: 'rgba(42, 133, 255, 1)',
          success: 'rgba(60, 159, 25, 1)',
          error: 'rgba(229, 58, 34, 1)',
          warning: 'rgba(228, 137, 0, 1)',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
