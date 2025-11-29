import { useEffect } from 'react';
import { useThemeStore } from '@/stores/useThemeStore';

export const ThemeController = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = (targetTheme: 'light' | 'dark') => {
      root.setAttribute('data-theme', targetTheme);
      if (targetTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleSystemChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };

      // Initial check
      applyTheme(mediaQuery.matches ? 'dark' : 'light');

      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  return null;
};
