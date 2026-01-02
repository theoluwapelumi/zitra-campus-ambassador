/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#60B74B',
          dark: '#538251',
          light: '#78BE49',
        },
        secondary: {
          yellow: '#F3EA17',
          purple: '#AC4D9D',
          orange: '#F6A31D',
          pink: '#C44884',
          'pink-light': '#D1A7CE',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
