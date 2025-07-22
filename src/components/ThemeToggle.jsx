import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full focus:outline-none text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
      aria-label="Toggle dark mode"
    >
      {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
};

export default ThemeToggle;