/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FE6601',
        'primary-light': '#FE8533',
        'primary-dark': '#E55A00',
        secondary: '#5856D6',
        accent: '#FF9500',
        success: '#34C759',
        warning: '#FFCC00',
      },
    },
  },
  plugins: [],
}
