/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        panel: '0 20px 45px rgba(31, 41, 55, 0.08)',
        auth: '0 24px 70px rgba(31, 41, 55, 0.11)'
      }
    }
  },
  plugins: []
};
