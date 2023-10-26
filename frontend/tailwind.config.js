/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          "main": "#1976d2",
          "light": "#757ce8",
          "dark": "#002884",
          "contrast": '#fff',
        },
        "secondary": {
          "100": "#E2E2D5",
          "200": "#888883",
        },
      },
    },
  },
  plugins: [],
}