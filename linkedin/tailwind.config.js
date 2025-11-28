/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#2563eb',     // Royal Blue 
        brandDark: '#1f2937',     // Gray 800 
        
        bgGray: '#e5e7eb',        // Gray 200 
        
        cardWhite: '#ffffff',     // Pure white 
        textMain: '#111827',      // Gray 900 
        textLight: '#4b5563',     // Gray 600
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}