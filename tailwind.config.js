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
          },
          certificates: {
            light: '#F0FDF4', // Green-50
            dark: '#052E16', // Green-950
          }
        }
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 20s linear infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}