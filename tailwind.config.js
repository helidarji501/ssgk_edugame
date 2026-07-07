/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'navy': '#1E2551',
        'pink': '#E9429F',
        'kraft': '#E4C7A3',
        'off-white': '#F8F9FC',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'Poppins', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },

  plugins: [],
}
