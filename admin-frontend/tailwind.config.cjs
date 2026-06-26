/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,迎え,tsx}",
    "./src/**/*.jsx",
    "./src/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f3cc9',
          light: '#f2f4fc',
          dark: '#0a2680',
        },
        secondary: {
          DEFAULT: '#ffcc00',
          light: '#fffde6',
          dark: '#b38f00',
        },
        accent: '#e63946',
        neutral: {
          DEFAULT: '#0f172a',
          light: '#f8f9fa',
          dark: '#1e293b',
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'ROUND_EIGHT': '0.5rem',
      },
      animation: {
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
