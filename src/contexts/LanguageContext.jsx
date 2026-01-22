/**
 * Контекст для управления языком интерфейса
 * Поддерживает английский и русский языки
 * Сохраняет выбранный язык в localStorage
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        try {
            const savedLanguage = localStorage.getItem('language');
            return (savedLanguage === 'ru' || savedLanguage === 'en') ? savedLanguage : 'en';
        } catch (e) {
            return 'en';
        }
    });

    useEffect(() => {
        document.documentElement.lang = language;
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key) => {
        const translation = translations[language]?.[key];
        return translation || key;
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ru' : 'en');
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
}

