import { useLanguage } from '../hooks/useLanguage';

// Компонент секции "О Swarmind"
export function AboutSwarmind({ onGetAccess }) {
    const { t } = useLanguage();

    return (
        <section className="about-swar">
            <div className="container">
                <div className="about-swar-content">
                    <div className="about-swar-left">
                        <h2>{t('aboutSwarMind')}</h2>
                        <p>{t('aboutSwarMindDesc1')}</p>
                        <p>{t('aboutSwarMindDesc2')}</p>
                        <button className="cta-button" onClick={onGetAccess}>
                            {t('getAccess')}
                        </button>
                    </div>
                    <div className="about-swar-right">
                        <div className="swar-card">
                            <div className="swar-card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="swar-card-content">
                                <h3>{t('quickStart')}</h3>
                                <p>{t('quickStartDesc')}</p>
                            </div>
                        </div>
                        <div className="swar-card">
                            <div className="swar-card-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div className="swar-card-content">
                                <h3>{t('infrastructureSavings')}</h3>
                                <p>{t('infrastructureSavingsDesc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}




