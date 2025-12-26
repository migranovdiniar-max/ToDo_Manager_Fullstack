import { useEffect, useState } from 'react';
import '../styles/ThemeSwitch.css';

function ThemeSwitch() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="theme-switch" onClick={toggleTheme}>
      <div className={`switch ${theme}`}>
        <span className="icon sun">☀️</span>
        <span className="icon moon">🌙</span>
        <div className="slider" />
      </div>
    </div>
  );
}

export default ThemeSwitch;
