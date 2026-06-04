import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark'); // Default to dark as the portfolio is dark by default

  useEffect(() => {
    let savedTheme = 'dark';
    try {
      savedTheme = localStorage.getItem('theme') || 'dark';
    } catch (e) {
      console.warn('localStorage is not available:', e);
    }
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      console.log('[Theme] Initial load: Light mode (removed .dark class)');
    } else {
      document.documentElement.classList.add('dark');
      console.log('[Theme] Initial load: Dark mode (added .dark class)');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('theme', nextTheme);
    } catch (e) {
      console.warn('localStorage is not available:', e);
    }
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      console.log('[Theme] Toggled: Light mode (removed .dark class)');
    } else {
      document.documentElement.classList.add('dark');
      console.log('[Theme] Toggled: Dark mode (added .dark class)');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
