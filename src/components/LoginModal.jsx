import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

// Модалка авторизации
export function LoginModal({ isOpen, onClose }) {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    useEffect(() => {
        if (!isOpen) {
            setFormData({ login: '', password: '' });
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Login form submitted:', formData);

        const message = language === 'ru'
            ? 'Попытка входа (пока без реальной авторизации).'
            : 'Login attempt (auth not implemented yet).';
        alert(message);

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            id="login-modal"
            className="modal show"
            onClick={(e) => e.target.id === 'login-modal' && onClose()}
        >
            <div className="modal-content">
                <span className="close" onClick={onClose}>×</span>
                <h2>{t('login')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Login"
                            value={formData.login}
                            onChange={(e) => handleChange('login', e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {t('login')}
                    </button>
                </form>
            </div>
        </div>
    );
}




