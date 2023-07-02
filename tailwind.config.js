/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      small: '550px',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        shake: {
          '0%, 50%, 100%': {
            transformOrigin: 'top center',
            transform: 'rotate(0deg)',
          },
          '25%': {
            transformOrigin: 'top center',
            transform: 'rotate(15deg)',
          },
          '75%': {
            transformOrigin: 'top center',
            transform: 'rotate(-15deg)',
          },
        },
      },
      animation: {
        blink: 'blink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shake: 'shake 150ms  cubic-bezier(.36,.07,.19,.97) 1.5',
      },
    },
  },
  plugins: [],
};
