import type { Config } from 'tailwindcss';
export default {
  content: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}', 'src/catalyst/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
