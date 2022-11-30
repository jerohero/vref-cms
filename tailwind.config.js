/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{vue,js,ts}"
  ],
  theme: {
    extend: {},
    colors: {
        background: '#191B20',
        foreground: '#292B32',
        primary: '#A003F8',
        secondary: '#3342CB',
        secondaryActive: '#263AA6',
        text: '#E6E6E6',
        textDark: '#D0D0D0',
        line: '#525459',
        lineDark: '#232323'
    }
  },
  plugins: [],
}
