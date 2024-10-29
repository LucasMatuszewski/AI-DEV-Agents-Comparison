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
    },
  },
  plugins: [],
};
export default config;
