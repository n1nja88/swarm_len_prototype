import { useState, useEffect } from 'react';

// Хук для управления темой (светлая/темная)
export function useTheme() {
    const [isLightTheme, setIsLightTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'light';
    });

    useEffect(() => {
        if (isLightTheme) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    }, [isLightTheme]);

    const toggleTheme = () => {
        setIsLightTheme(prev => !prev);
    };

    return { isLightTheme, toggleTheme };
}

