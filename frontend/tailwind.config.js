/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#10b981',
          hover: '#059669',
          text: '#34d399',
          light: '#d1fae5',
        },
        surface: {
          DEFAULT: '#111827',
          2: '#1f2937',
          3: '#374151',
        },
      },
    },
  },
  plugins: [],
}
