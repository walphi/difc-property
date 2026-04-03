/** @type {import('tailwindcss').Config} */
module.exports = {
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
        gold: {
          DEFAULT: '#B8956B',
          light: '#D4B896',
          dark: '#8B7355',
        },
        primary: {
          DEFAULT: '#2D5A4A',
          light: '#3D7A5F',
          dark: '#1F3D31',
        },
        warm: {
          50: '#FDFCFB',
          100: '#F7F5F2',
          200: '#EDE9E4',
          300: '#DDD6CC',
          400: '#B5A99B',
          500: '#8B7F71',
          600: '#6B5F53',
          700: '#4A4239',
          800: '#2D2924',
          900: '#1A1815',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
