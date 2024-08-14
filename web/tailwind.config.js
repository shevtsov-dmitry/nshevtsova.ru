/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'andika-bold': ['Andika-Bold', 'sans-serif'],
                jost: ['Jost', 'sans-serif'],
                'ptsans-bold': ['PTSans-Bold', 'sans-serif']
            },
            screens: {
                laptop: '1366px',
                mobile: '650px'
            },
            colors: {}
        }
    },
    plugins: ['prettier-plugin-tailwindcss']
};
