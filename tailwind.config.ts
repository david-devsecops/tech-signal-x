import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Korean-optimized font families
        'korean': ['Pretendard', 'Noto Sans KR', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Apple SD Gothic Neo', 'Malgun Gothic', 'dotum', 'sans-serif'],
        'korean-serif': ['Noto Serif KR', 'Apple SD Gothic Neo', 'serif'],
        'korean-display': ['Pretendard', 'Noto Sans KR', 'sans-serif'],
        'korean-body': ['Pretendard', 'Noto Sans KR', 'sans-serif'],
        'code': ['JetBrains Mono', 'D2 Coding', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Korean-optimized typography scale
        'korean-xs': ['0.75rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'korean-sm': ['0.875rem', { lineHeight: '1.65', letterSpacing: '-0.015em' }],
        'korean-base': ['1rem', { lineHeight: '1.75', letterSpacing: '-0.02em' }],
        'korean-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.02em' }],
        'korean-xl': ['1.25rem', { lineHeight: '1.65', letterSpacing: '-0.025em' }],
        'korean-2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.03em' }],
        'korean-3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.035em' }],
        'korean-4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.04em' }],
        'korean-5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.045em' }],
        'korean-6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.05em' }],
        'korean-7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.055em' }],
        'korean-8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.06em' }],
        'korean-9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.065em' }],
      },
      letterSpacing: {
        // Korean-specific letter spacing
        'korean-tight': '-0.03em',
        'korean-normal': '-0.02em',
        'korean-relaxed': '-0.01em',
      },
      wordSpacing: {
        // Korean-specific word spacing
        'korean-tight': '0.05em',
        'korean-normal': '0.1em',
        'korean-relaxed': '0.15em',
      },
      spacing: {
        // Korean content spacing
        'korean-section': '5rem',
        'korean-element': '1.5rem',
        'korean-paragraph': '1.2rem',
        'korean-title': '2rem',
      },
      colors: {
        // Korean typography colors (inheriting from CSS variables)
        'korean-text': {
          primary: 'var(--korean-text-primary)',
          secondary: 'var(--korean-text-secondary)',
          muted: 'var(--korean-text-muted)',
          accent: 'var(--korean-text-accent)',
          emphasis: 'var(--korean-text-emphasis)',
        }
      },
      screens: {
        // Korean typography responsive breakpoints
        'korean-sm': '480px',
        'korean-md': '768px',
        'korean-lg': '1024px',
        'korean-xl': '1280px',
        'korean-2xl': '1536px',
      },
    },
  },
  plugins: [
    // Add custom plugin for Korean typography utilities
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        '.korean-text-balance': {
          'text-wrap': 'balance',
          'word-break': 'keep-all',
          'overflow-wrap': 'break-word',
        },
        '.korean-paragraph': {
          'text-align': 'justify',
          'text-justify': 'inter-ideograph',
          'word-spacing': '0.1em',
          'line-height': '1.8',
          'margin-bottom': '1.2em',
        },
        '.korean-title': {
          'text-align': 'center',
          'word-break': 'keep-all',
          'line-height': '1.3',
          'margin-bottom': '0.8em',
        },
        '.korean-subtitle': {
          'word-break': 'keep-all',
          'line-height': '1.5',
          'margin-bottom': '0.6em',
        },
        '.mixed-content': {
          'font-family': 'Pretendard, Inter, sans-serif',
          'letter-spacing': '-0.01em',
          'word-spacing': '0.05em',
        },
        '.mixed-content .english': {
          'font-family': 'Inter, sans-serif',
          'letter-spacing': '-0.005em',
        },
        '.mixed-content .korean': {
          'font-family': 'Pretendard, Noto Sans KR, sans-serif',
          'letter-spacing': '-0.02em',
        },
        '.container-korean': {
          'max-width': '1200px',
          'margin': '0 auto',
          'padding': '0 1.5rem',
        },
        '.section-spacing': {
          'padding': '5rem 0',
        },
        '.vertical-rhythm > * + *': {
          'margin-top': '1.5rem',
        },
        '.vertical-rhythm-tight > * + *': {
          'margin-top': '1rem',
        },
        '.vertical-rhythm-loose > * + *': {
          'margin-top': '2rem',
        },
        // Mobile responsive utilities
        '@media (max-width: 768px)': {
          '.container-korean': {
            'padding': '0 1rem',
          },
          '.section-spacing': {
            'padding': '3rem 0',
          },
        },
        // Korean mobile typography adjustments
        '@media (max-width: 480px)': {
          '.font-korean-display': {
            'letter-spacing': '-0.025em',
            'line-height': '1.25',
          },
          '.font-korean-body': {
            'letter-spacing': '-0.01em',
            'line-height': '1.9',
          },
        },
      }
      
      addUtilities(newUtilities)
    },
  ],
}

export default config