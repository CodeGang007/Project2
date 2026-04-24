import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f7f6',
          100: '#eeedeb',
          200: '#d9d8d4',
          300: '#b8b6af',
          400: '#8f8d84',
          500: '#6a6860',
          600: '#4d4c46',
          700: '#353430',
          800: '#222220',
          900: '#121211',
          950: '#080807'
        },
        brand: {
          50: '#edf5fa',
          100: '#d6e8f3',
          200: '#a8cce4',
          300: '#75aed2',
          400: '#468fbd',
          500: '#2a73a6',
          600: '#1f5a85',
          700: '#18476a',
          800: '#123755',
          900: '#0c243a'
        },
        accent: {
          DEFAULT: '#c7a24b',
          light: '#e0c073'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', '"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif']
      },
      fontSize: {
        // Editorial scale — tighter than default Tailwind
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.55' }],
        base: ['1rem', { lineHeight: '1.65' }],
        lg: ['1.0625rem', { lineHeight: '1.7' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.35' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        '5xl': ['3.25rem', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        '6xl': ['4rem', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        '7xl': ['5rem', { lineHeight: '0.95', letterSpacing: '-0.025em' }]
      },
      letterSpacing: {
        micro: '0.12em'
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }
  },
  plugins: []
};

export default config;
