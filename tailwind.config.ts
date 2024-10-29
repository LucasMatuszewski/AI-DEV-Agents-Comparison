import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        red: {
          100: 'var(--red-100) /* hsl(360, 87%, 10%) */',
          200: 'var(--red-200) /* hsl(360, 87%, 20%) */',
          300: 'var(--red-300) /* hsl(360, 87%, 30%) */',
          DEFAULT: 'var(--red) /* hsl(360, 87%, 44%) */',
          400: 'var(--red-400) /* hsl(360, 87%, 40%) */',
          500: 'var(--red-500) /* hsl(360, 87%, 50%) */',
          600: 'var(--red-600) /* hsl(360, 87%, 60%) */',
          700: 'var(--red-700) /* hsl(360, 87%, 70%) */',
          800: 'var(--red-800) /* hsl(360, 87%, 80%) */',
          900: 'var(--red-900) /* hsl(360, 87%, 90%) */',
        },
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        expandDown: {
          '0%': {
            opacity: '0',
            transform: 'scaleY(0)',
            transformOrigin: 'top',
          },
          '100%': {
            opacity: '1',
            transform: 'scaleY(1)',
            transformOrigin: 'top',
          },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-up-delay': 'fadeInUp 0.6s ease-out 0.3s forwards',
        'fade-in-up-delay-2': 'fadeInUp 0.6s ease-out 0.6s forwards',
        'expand-down': 'expandDown 0.4s ease-out forwards',
        'fade-out': 'fadeOut 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
