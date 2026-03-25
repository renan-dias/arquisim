import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check local storage or system preference on mount
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      setIsLight(true);
      document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      setIsLight(false);
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      setIsLight(true);
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'var(--panel-bg)',
        border: '1px solid var(--panel-border)',
        color: 'var(--primary-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 9999,
        backdropFilter: 'blur(10px)'
      }}
      title="Alternar Tema (Claro/Escuro)"
    >
      {isLight ? <Moon size={24} /> : <Sun size={24} />}
    </motion.button>
  );
};

export default ThemeToggle;
