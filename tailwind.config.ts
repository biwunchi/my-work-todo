import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern Minimal Color Palette
        'mm-dark': '#0f172a',           // Dark Navy Background
        'mm-navy': '#0f3a5f',           // Alternative Navy
        'mm-surface': '#1e293b',        // Surface/Card Background
        'mm-surface-light': '#334155',  // Lighter Surface
        'mm-text': '#f8fafc',           // Bright White Text
        'mm-text-secondary': '#cbd5e1', // Secondary Text
        'mm-emerald': '#00b894',        // Primary Emerald Green
        'mm-emerald-light': '#1dd1a1',  // Lighter Emerald
        'mm-border': '#334155',         // Border Color
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
