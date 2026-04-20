/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004555',
          container: '#165e71',
          fixed: '#b5ebff',
          'fixed-dim': '#92d0e6',
        },
        secondary: {
          DEFAULT: '#47636b',
          container: '#c9e8f1',
        },
        tertiary: {
          DEFAULT: '#00474e',
          container: '#006069',
        },
        surface: {
          DEFAULT: '#f7f9ff',
          bright: '#f7f9ff',
          dim: '#d7dae0',
          container: {
            DEFAULT: '#ebeef4',
            low: '#f1f4fa',
            lowest: '#ffffff',
            high: '#e5e8ee',
            highest: '#dfe3e8',
          },
          variant: '#dfe3e8',
          tint: '#23667a',
        },
        'on-surface': {
          DEFAULT: '#181c20',
          variant: '#3f4949',
        },
        outline: {
          DEFAULT: '#6f7979',
          variant: '#bec8c9',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
      },
      spacing: {
        6: '1.5rem',
      },
    },
  },
  plugins: [],
}
