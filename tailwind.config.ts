import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'body-bg': 'var(--body-bg)',
        'body-text': 'var(--body-text)',
        'focus-visible-outline': 'var(--focus-visible-outline)',
        'todo-item-bg': 'var(--todo-item-bg)',
        'todo-item-toggle-bg': 'var(--todo-item-toggle-bg)',
        'todo-item-toggle-border': 'var(--todo-item-toggle-border)',
        'todo-item-toggle-completed-check-icon': 'var(--todo-item-toggle-completed-check-icon)',
        'todo-item-placeholder-text': 'var(--todo-item-placeholder-text)',
        'todo-item-text': 'var(--todo-item-text)',
        'todo-item-text-completed': 'var(--todo-item-text-completed)',
        'todo-item-remove-btn': 'var(--todo-item-remove-btn)',
        'todo-item-remove-btn-hover': 'var(--todo-item-remove-btn-hover)',
        'todo-list-bg': 'var(--todo-list-bg)',
        'filter-buttons-text': 'var(--filter-buttons-text)',
        'filter-buttons-text-hover': 'var(--filter-buttons-text-hover)',
        'filter-buttons-text-active': 'var(--filter-buttons-text-active)',
        'clear-completd-btn-text': 'var(--clear-completd-btn-text)',
        'clear-completd-btn-text-hover': 'var(--clear-completd-btn-text-hover)',
      },
      backgroundImage: {
        'todo-item-toggle-border-hover':
          'linear-gradient(to bottom right, var(--todo-item-toggle-border-hover-1), var(--todo-item-toggle-border-hover-2))',
        'todo-item-toggle-completed':
          'linear-gradient(to bottom right, var(--todo-item-toggle-completed-1), var(--todo-item-toggle-completed-2))',
      },
      boxShadow: {
        'todo-item-box-shadow': 'var(--todo-item-box-shadow)',
        'todo-list-box-shadow': 'var(--todo-list-box-shadow)',
      },
      fontFamily: {
        'josefin-sans': ['var(--josefin-sans-font)'],
      },
    },
  },
  plugins: [],
};
export default config;
