import { useState, useEffect } from 'react';
import { translations } from '../utils/translations';

// Хук для управления языком интерфейса
export function useLanguage() {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en';
    });

    useEffect(() => {
        document.documentElement.lang = language;
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key) => {
        return translations[language]?.[key] || key;
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ru' : 'en');
    };

    return { language, setLanguage, toggleLanguage, t };
}

