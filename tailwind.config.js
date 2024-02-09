/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
