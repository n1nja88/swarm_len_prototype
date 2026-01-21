import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { ParticleCanvas } from '../components/ParticleCanvas';

export function UnifiedAPI({ onGetAccess }) {
    const { t } = useLanguage();
    const { isLightTheme } = useTheme();

    return (
        <div className="page">
            <section className="hero">
                <div className="hero-background">
                    <ParticleCanvas particleCount={80} isLightTheme={isLightTheme} />
                </div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>{t('unifiedAPITitle')}</h1>
                            <h2>{t('unifiedAPISubtitle')}</h2>
                            <div className="hero-buttons">
                                <button className="cta-button" onClick={onGetAccess}>
                                    {t('getAccess')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="api-features">
                <div className="container">
                    <h2 className="api-features-title">{t('unifiedAPIFeaturesTitle')}</h2>
                    <div className="api-features-grid">
                        <div className="api-feature-card">
                            <div className="api-feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="api-feature-title">{t('unifiedAPIFeature1Title')}</h3>
                            <p className="api-feature-desc">{t('unifiedAPIFeature1Desc')}</p>
                        </div>
                        <div className="api-feature-card">
                            <div className="api-feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="api-feature-title">{t('unifiedAPIFeature2Title')}</h3>
                            <p className="api-feature-desc">{t('unifiedAPIFeature2Desc')}</p>
                        </div>
                        <div className="api-feature-card">
                            <div className="api-feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <h3 className="api-feature-title">{t('unifiedAPIFeature3Title')}</h3>
                            <p className="api-feature-desc">{t('unifiedAPIFeature3Desc')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

