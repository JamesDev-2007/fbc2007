import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon } from './icons';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-church-maroon-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-church-maroon dark:ring-offset-church-maroon-dark focus:ring-white transition-colors duration-200"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6 text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
