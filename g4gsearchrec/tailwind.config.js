/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom green color scheme as requested
        'primary-green': '#2f8d46',
        'primary-green-alt': '#008000', 
        'accent-light': '#dff0d8',
        'accent-light-alt': '#eafaf1',
        'text-dark': '#333333',
        'text-black': '#000000',
        'bg-white': '#ffffff',
      }
    },
  },
  plugins: [],
}

