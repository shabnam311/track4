/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        soil: {
          700: '#3a4530',
          800: '#2c3524',
          900: '#22281c',
        },
        leaf: {
          500: '#6a9955',
          600: '#4f7942',
          700: '#3a5a30',
        },
        wheat: {
          50: '#fdf8ec',
          100: '#faf3e0',
          400: '#e8c468',
          700: '#b89445',
          900: '#7c4a12',
        },
        sky: {
          100: '#eef4ee',
        },
        paper: '#fbfaf6',
      },
      fontFamily: {
        sans: ['Manrope', 'Noto Sans Devanagari', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
      },
      backgroundImage: {
        'radial-pattern': 'radial-gradient(circle at 85% 10%, rgba(232,196,104,0.25), transparent 40%), radial-gradient(circle at 10% 90%, rgba(79,121,66,0.15), transparent 45%)',
      }
    },
  },
  plugins: [],
}
