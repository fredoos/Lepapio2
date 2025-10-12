/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'papio': {
          50: '#f0f9f8',
          100: '#ccede9',
          200: '#99dbd4',
          300: '#6EB8B2',
          400: '#4a9690',
          500: '#6EB8B2',
          600: '#5a9a95',
          700: '#4a7f7b',
          800: '#3d6662',
          900: '#335551',
        }
      }
    },
  },
  plugins: [],
}