import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../hooks/useTheme';
import { ParticleCanvas } from './ParticleCanvas';
import { Link } from 'react-router-dom';

// Компонент секции "Больше возможностей"
export function MorePossibilities({ onGetAccess }) {
    const { t } = useLanguage();
    const { isLightTheme } = useTheme();

    return (
        <section className="more-possibilities">
            <ParticleCanvas particleCount={40} isLightTheme={isLightTheme} />
            <div className="container">
                <h2 className="section-title">{t('morePossibilities')}</h2>
                <div className="possibilities-grid">
                    <div className="possibility-card">
                        <div className="possibility-card-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3>{t('aiCreators')}</h3>
                        <div className="possibility-card-content">
                            <p className="possibility-card-desc-first" dangerouslySetInnerHTML={{ __html: t('aiCreatorsDesc1') }} />
                            <p dangerouslySetInnerHTML={{ __html: t('aiCreatorsDesc2') }} />
                            <Link to="/free-infrastructure" className="learn-more-link possibility-learn-more">
                                {t('learnMore')}
                            </Link>
                        </div>
                    </div>
                    <div className="possibility-card">
                        <div className="possibility-card-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                            </svg>
                        </div>
                        <h3>{t('gpuProviders')}</h3>
                        <div className="possibility-card-content">
                            <p dangerouslySetInnerHTML={{ __html: t('gpuProvidersDesc1') }} />
                            <p dangerouslySetInnerHTML={{ __html: t('gpuProvidersDesc2') }} />
                        </div>
                    </div>
                </div>
                <div className="possibilities-cta">
                    <button className="cta-button" onClick={onGetAccess}>
                        {t('getAccess')}
                    </button>
                </div>
            </div>
        </section>
    );
}

