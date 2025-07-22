/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          light: '#4F46E5', // Indigo
          dark: '#7C3AED', // Purple
        },
        secondary: {
          light: '#10B981', // Emerald
          dark: '#059669', // Dark Emerald
        },
        // Section-specific colors
        section: {
          home: {
            light: '#FFFFFF',
            dark: '#111827', // Gray-900
          },
          about: {
            light: '#EEF2FF', // Indigo-50
            dark: '#1E1B4B', // Indigo-950
          },
          skills: {
            light: '#ECFDF5', // Emerald-50
            dark: '#022C22', // Emerald-950
          },
          projects: {
            light: '#F5F3FF', // Purple-50
            dark: '#2E1065', // Purple-950
          },
          contact: {
            light: '#EFF6FF', // Blue-50
            dark: '#172554', // Blue-950
          }
        }
      },
    },
  },
  plugins: [],
}