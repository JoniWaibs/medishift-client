/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        backgroundColor: 'var(--background-color)',
        borderColor: 'var(--border-color)',
        accentColor: 'var(--accent-color)',
        headingColor: 'var(--heading-color)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
