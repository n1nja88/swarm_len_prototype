import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { ParticleCanvas } from '../components/ParticleCanvas';

export function FreeInfrastructure() {
    const { t } = useLanguage();
    const { isLightTheme } = useTheme();

    return (
        <div className="page">
            <section className="hero">
                <div className="hero-background">
                    <ParticleCanvas particleCount={80} isLightTheme={isLightTheme} />
                </div>
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>{t('freeInfrastructureTitle')}</h1>
                        <h2>{t('freeInfrastructureSubtitle')}</h2>
                    </div>
                </div>
            </section>
        </div>
    );
}

