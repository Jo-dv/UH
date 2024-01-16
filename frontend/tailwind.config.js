/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink1: '#F3A4DF',
        pink2: '#DD5EB6',
        pink3: '#DE618F',
        pink4: '#F48E9A',
        blue1: '#8CB6ED',
        blue2: '#2E75D0',
        blue3: '#3671C6',
        blue4: '#2160D0',
        purple1: '#8E6DF2',
        purple2: '#9F57B1',
        purple3: '#391954',
        purple4: '#000A20',
        purple5: '#A5488C',
        input: '#554E4E',
        input2: 'rgba(85, 78, 78, 0.72)'
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}