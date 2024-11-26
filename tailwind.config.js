/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Ativa o modo escuro com a classe "dark"
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1d4ed8', // Cor para o Light Mode
          dark: '#3b82f6',  // Cor para o Dark Mode
        },
        background: {
          light: '#f9fafb',
          dark: '#030712',
        },
        text: {
          light: '#000000',
          dark: '#ffffff',
        },
        border: {
          light: '#e5e7eb',
          dark: '#374151',
        },
      },
    },
  },
  plugins: [],
};
