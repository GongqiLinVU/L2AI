/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Theme-adaptive foreground: near-white in dark mode, near-black in light mode.
        // Use for text/borders/overlays that should flip with the theme; literal `white`
        // is left untouched for text sitting on solid brand-colored buttons/badges.
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          // 300/400 are used as *text* accents (taglines, links, icons) so they flip
          // to a darker shade in light mode for contrast. 500+ stay fixed — they're
          // solid button/badge backgrounds and look the same in either theme.
          300: 'rgb(var(--brand-300-rgb) / <alpha-value>)',
          400: 'rgb(var(--brand-400-rgb) / <alpha-value>)',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          300: 'rgb(var(--accent-300-rgb) / <alpha-value>)',
          400: 'rgb(var(--accent-400-rgb) / <alpha-value>)',
          500: '#10b981',
          600: '#059669',
        },
        violet: {
          300: 'rgb(var(--violet-300-rgb) / <alpha-value>)',
        },
        sky: {
          300: 'rgb(var(--sky-300-rgb) / <alpha-value>)',
        },
        slate: {
          200: 'rgb(var(--slate-200-rgb) / <alpha-value>)',
          300: 'rgb(var(--slate-300-rgb) / <alpha-value>)',
          400: 'rgb(var(--slate-400-rgb) / <alpha-value>)',
          500: 'rgb(var(--slate-500-rgb) / <alpha-value>)',
          600: 'rgb(var(--slate-600-rgb) / <alpha-value>)',
        },
        surface: {
          900: 'rgb(var(--surface-900-rgb) / <alpha-value>)',
          800: 'rgb(var(--surface-800-rgb) / <alpha-value>)',
          700: 'rgb(var(--surface-700-rgb) / <alpha-value>)',
          600: 'rgb(var(--surface-600-rgb) / <alpha-value>)',
          500: 'rgb(var(--surface-500-rgb) / <alpha-value>)',
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(16,185,129,0.04) 100%)',
        'glow-indigo': 'radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.8s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
