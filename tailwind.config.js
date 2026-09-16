/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAF9',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#17171A',
          soft: '#6E6E76',
          faint: '#A3A3AA',
        },
        line: {
          DEFAULT: '#E5E5E2',
          soft: '#EFEFED',
        },
        accent: {
          DEFAULT: '#3854D6',
          hover: '#2C42B3',
          soft: '#EEF1FC',
        },
        status: {
          pending: '#B4790F',
          'pending-soft': '#FBF1DF',
          running: '#2563EB',
          'running-soft': '#E9F0FE',
          completed: '#178A4C',
          'completed-soft': '#E7F6ED',
          failed: '#C22A2A',
          'failed-soft': '#FBEAEA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(23, 23, 26, 0.04), 0 8px 24px -12px rgba(23, 23, 26, 0.12)',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'rise-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.22s ease-out',
        'fade-in': 'fade-in 0.15s ease-out',
        'rise-in': 'rise-in 0.18s ease-out',
      },
    },
  },
  plugins: [],
};
