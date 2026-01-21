import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { ParticleCanvas } from '../components/ParticleCanvas';

export function GPURental({ onGetAccess }) {
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
                            <h1>{t('gpuRentalTitle')}</h1>
                            <h2>{t('gpuRentalSubtitle')}</h2>
                            <div className="hero-buttons">
                                <button className="cta-button" onClick={onGetAccess}>
                                    {t('getAccess')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

