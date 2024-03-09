/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      grey: '#EBEBEB',
      primary: {
        1: '#E7FFE9',
        2: '#A1FFC7',
        3: '#81F8B1'
      }
    }
  }
}
