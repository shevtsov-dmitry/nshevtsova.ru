/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'andika-bold': ['Andika-Bold', 'sans-serif'],
        'jost-medium': ['Jost-Medium', 'sans-serif'],
        'ptsans-bold': ['PTSans-Bold', 'sans-serif'],
      },
      screens: {
        laptop: '1700px',
        mobile: '1133px',
      },
      colors: {},
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
}
