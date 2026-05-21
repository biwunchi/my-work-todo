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
        // Premium Modern Minimal Color Palette
        'mm-dark': '#050b18',           // Ultra Dark Navy Background
        'mm-dark-secondary': '#0f172a', // Secondary Dark Background
        'mm-navy': '#0a1f2e',           // Navy Alternative
        'mm-surface': '#0f172a',        // Primary Surface/Card Background
        'mm-surface-alt': '#162032',    // Alternative Surface
        'mm-surface-light': '#1e293b',  // Light Surface
        'mm-surface-lighter': '#334155',// Lighter Surface
        'mm-text': '#f8fafc',           // Bright White Text
        'mm-text-secondary': '#cbd5e1', // Secondary Text
        'mm-text-tertiary': '#94a3b8',  // Tertiary Text
        'mm-emerald': '#10b981',        // Primary Emerald Green (refined)
        'mm-emerald-light': '#34d399',  // Lighter Emerald
        'mm-emerald-dark': '#059669',   // Darker Emerald
        'mm-border': '#1e293b',         // Primary Border Color
        'mm-border-light': '#334155',   // Light Border Color
        'mm-accent': '#06b6d4',         // Cyan Accent
        'mm-success': '#10b981',        // Success Green
        'mm-warning': '#f59e0b',        // Warning Amber
        'mm-error': '#ef4444',          // Error Red
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(0, 0, 0, 0.5)',
        'premium-md': '0 10px 30px rgba(0, 0, 0, 0.3)',
        'premium-sm': '0 5px 15px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(16, 185, 129, 0.2)',
        'glow-md': '0 0 30px rgba(16, 185, 129, 0.3)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
