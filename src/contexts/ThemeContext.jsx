
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    
    // Remove all existing theme classes
    document.documentElement.classList.remove('theme-light', 'theme-high-contrast');
    
    // Add the new theme class if it's not the default
    if (newTheme !== 'default') {
      document.documentElement.classList.add(`theme-${newTheme}`);
    }
    
    // Save to localStorage
    localStorage.setItem('cryptoPilot-theme', newTheme);
  };

  useEffect(() => {
    // Load theme from localStorage on initial render
    const savedTheme = localStorage.getItem('cryptoPilot-theme');
    if (savedTheme) {
      changeTheme(savedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
