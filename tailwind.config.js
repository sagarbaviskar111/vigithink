/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./etmf/index.html",
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
        // eTMF tool palette
        brand: {
          50: '#f0f7ff', 100: '#e0effe', 200: '#bae0fd', 300: '#7cc8fb', 400: '#36a9f7',
          500: '#0c8de4', 600: '#0270c1', 700: '#03599d', 800: '#074c82', 900: '#0c406d',
          accent: '#0284c7'
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
