import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('portfolio-theme') as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');

    // Smoothly update document body styles to avoid flashes and fit design specifications
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#020000';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#FAFAF8';
      document.body.style.color = '#0F172A';
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
