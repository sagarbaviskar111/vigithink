/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a4b8f", // Corporate Blue (APCER/Clinical Style)
        secondary: "#e0f2fe", // Light Sky Blue for subtle backgrounds
        accent: "#f97316", // Clean Medical Orange for buttons/highlights
        background: "#ffffff", // Pure White
        surface: "#f8fafc", // Slate 50 for alternate sections
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
