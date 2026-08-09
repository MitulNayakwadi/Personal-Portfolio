import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full border border-slate-200 dark:border-white/10 
                 bg-white dark:bg-white/5 text-slate-700 dark:text-gray-300
                 hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white
                 transition-colors duration-200 cursor-pointer flex items-center justify-center shadow-sm"
      aria-label="Toggle portfolio mode"
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Simple Mode'}
      data-hover="true"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </motion.div>
    </motion.button>
  );
}
