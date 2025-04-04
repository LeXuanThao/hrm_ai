import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useSetting } from './SettingProvider';
import { AuthProvider } from './AuthProvider';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

export const ThemeProvider = ({ children, defaultTheme = 'system' }: ThemeProviderProps) => {
  const { registerSetting, updateSetting, settings } = useSetting();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Register theme setting
  useEffect(() => {
    registerSetting('theme', defaultTheme);
  }, []);

  const theme = settings.theme || defaultTheme;

  // Update dark mode based on theme setting
  useEffect(() => {
    const updateDarkMode = () => {
      if (theme === 'system') {
        const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(systemDarkMode);
      } else {
        setIsDarkMode(theme === 'dark');
      }
    };

    updateDarkMode();

    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => updateDarkMode();
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const setTheme = (newTheme: ThemeMode) => {
    updateSetting('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode }}>
      <AuthProvider>{children}</AuthProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
