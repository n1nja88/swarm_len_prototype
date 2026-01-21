import { useLanguage } from '../contexts/LanguageContext';
import { ParticleCanvas } from './ParticleCanvas';
import { useTheme } from '../hooks/useTheme';

// Компонент Hero секции
export function Hero({ onGetAccess, onLogin }) {
    const { t } = useLanguage();
    const { isLightTheme } = useTheme();

    return (
        <section className="hero">
            <div className="hero-background">
                <ParticleCanvas particleCount={80} isLightTheme={isLightTheme} />
            </div>
            <div className="hero-content">
                <div className="hero-text">
                    <h1>{t('heroTitle')}</h1>
                    <h2>{t('heroSubtitle')}</h2>
                    <div className="hero-buttons">
                        <button className="cta-button" onClick={onGetAccess}>
                            {t('getAccess')}
                        </button>
                        <button className="login-button" onClick={onLogin}>
                            {t('login')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

