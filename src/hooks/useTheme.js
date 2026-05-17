import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#0f172a';
      root.style.color = '#f8fafc';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#f1f5f9';
      root.style.color = '#0f172a';
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return { theme, toggle };
};