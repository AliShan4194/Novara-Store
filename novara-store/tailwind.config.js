/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // These read from CSS variables in src/index.css so light/dark mode can swap them.
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        night: '#0b0b0e',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgb(0 0 0 / 0.22)',
        lift: '0 24px 50px -18px rgb(0 0 0 / 0.45)',
        glow: '0 0 0 1px rgb(var(--accent) / 0.4), 0 22px 60px -20px rgb(var(--accent) / 0.5)',
        // Layered "studio" shadows for cards: a tight contact shadow + a long soft one
        card: 'inset 0 1px 0 rgb(var(--hi) / var(--hi-a)), 0 1px 2px rgb(0 0 0 / 0.12), 0 8px 16px -8px rgb(0 0 0 / 0.25), 0 26px 50px -24px rgb(0 0 0 / 0.55)',
        'card-hover':
          'inset 0 1px 0 rgb(var(--hi) / var(--hi-a)), 0 2px 4px rgb(0 0 0 / 0.14), 0 16px 30px -12px rgb(0 0 0 / 0.4), 0 44px 80px -30px rgb(0 0 0 / 0.7), 0 0 0 1px rgb(var(--accent) / 0.3)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
