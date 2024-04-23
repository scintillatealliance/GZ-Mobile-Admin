/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/App.jsx",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    container: {
      center: false,
    },
    extend: {
      fontFamily: {
        public: ["Public Sans", "sans-serif"],
      },
    },

  },
  plugins: [],
}