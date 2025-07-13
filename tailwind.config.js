/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['IBM Plex Sans Thai', 'system-ui', 'sans-serif'],
        'display': ['Sarabun', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#ef4444",
          "primary-content": "#ffffff",
          "secondary": "#f97316",
          "secondary-content": "#ffffff",
          "accent": "#f59e0b",
          "accent-content": "#000000",
          "neutral": "#2a323c",
          "neutral-content": "#ffffff",
          "base-100": "#1a1b1e",
          "base-200": "#25262b",
          "base-300": "#2f3034",
          "base-content": "#e5e7eb",
          "info": "#06b6d4",
          "info-content": "#000000",
          "success": "#10b981",
          "success-content": "#000000",
          "warning": "#f59e0b",
          "warning-content": "#000000",
          "error": "#ef4444",
          "error-content": "#ffffff",
        },
      },
    ],
    darkTheme: "dark",
  },
}