import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../hooks/useTheme';
import { ParticleCanvas } from '../components/ParticleCanvas';

export function GPURental({ onGetAccess }) {
    const { t } = useLanguage();
    const { isLightTheme } = useTheme();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const whySectionRef = useRef(null);
    const [whyVisible, setWhyVisible] = useState(false);
    const whyItemRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setWhyVisible(true);
                        // Анимация для каждого элемента отдельно
                        whyItemRefs.current.forEach((itemRef, index) => {
                            if (itemRef) {
                                setTimeout(() => {
                                    itemRef.classList.add('visible');
                                }, index * 150);
                            }
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (whySectionRef.current) {
            observer.observe(whySectionRef.current);
        }

        return () => {
            if (whySectionRef.current) {
                observer.unobserve(whySectionRef.current);
            }
        };
    }, []);

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
            <section className="gpu-rental-tasks">
                <div className="container">
                    <h2 className="gpu-rental-tasks-title">{t('gpuRentalTasksTitle')}</h2>
                    <div className="gpu-rental-tasks-grid">
                        <div className="gpu-rental-task-card">
                            <h3 className="gpu-rental-task-title">{t('gpuRentalTask1Title')}</h3>
                            <p className="gpu-rental-task-desc">{t('gpuRentalTask1Desc')}</p>
                        </div>
                        <div className="gpu-rental-task-card">
                            <h3 className="gpu-rental-task-title">{t('gpuRentalTask2Title')}</h3>
                            <p className="gpu-rental-task-desc">{t('gpuRentalTask2Desc')}</p>
                        </div>
                        <div className="gpu-rental-task-card">
                            <h3 className="gpu-rental-task-title">{t('gpuRentalTask3Title')}</h3>
                            <p className="gpu-rental-task-desc">{t('gpuRentalTask3Desc')}</p>
                        </div>
                        <div className="gpu-rental-task-card">
                            <h3 className="gpu-rental-task-title">{t('gpuRentalTask4Title')}</h3>
                            <p className="gpu-rental-task-desc">{t('gpuRentalTask4Desc')}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="gpu-rental-why" ref={whySectionRef}>
                <div className="container">
                    <h2 className={`gpu-rental-why-title ${whyVisible ? 'visible' : ''}`}>{t('gpuRentalWhyTitle')}</h2>
                    <div className="gpu-rental-why-items">
                        <div 
                            className="gpu-rental-why-item" 
                            ref={el => whyItemRefs.current[0] = el}
                        >
                            <h3 className="gpu-rental-why-item-title">{t('gpuRentalWhy1Title')}</h3>
                            <p className="gpu-rental-why-item-desc">{t('gpuRentalWhy1Desc')}</p>
                        </div>
                        <div 
                            className="gpu-rental-why-item"
                            ref={el => whyItemRefs.current[1] = el}
                        >
                            <h3 className="gpu-rental-why-item-title">{t('gpuRentalWhy2Title')}</h3>
                            <p className="gpu-rental-why-item-desc">{t('gpuRentalWhy2Desc')}</p>
                        </div>
                        <div 
                            className="gpu-rental-why-item"
                            ref={el => whyItemRefs.current[2] = el}
                        >
                            <h3 className="gpu-rental-why-item-title">{t('gpuRentalWhy3Title')}</h3>
                            <p className="gpu-rental-why-item-desc">{t('gpuRentalWhy3Desc')}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="gpu-rental-how-to">
                <div className="container">
                    <h2 className="gpu-rental-how-to-title">{t('gpuRentalHowToTitle')}</h2>
                    <div className="gpu-rental-how-to-grid">
                        <div className="gpu-rental-how-to-card">
                            <div className="gpu-rental-how-to-icon">
                                <span>1</span>
                            </div>
                            <h3 className="gpu-rental-how-to-card-title">{t('gpuRentalHowTo1Title')}</h3>
                            <p className="gpu-rental-how-to-card-desc">{t('gpuRentalHowTo1Desc')}</p>
                        </div>
                        <div className="gpu-rental-how-to-card">
                            <div className="gpu-rental-how-to-icon">
                                <span>2</span>
                            </div>
                            <h3 className="gpu-rental-how-to-card-title">{t('gpuRentalHowTo2Title')}</h3>
                            <p className="gpu-rental-how-to-card-desc">{t('gpuRentalHowTo2Desc')}</p>
                        </div>
                        <div className="gpu-rental-how-to-card">
                            <div className="gpu-rental-how-to-icon">
                                <span>3</span>
                            </div>
                            <h3 className="gpu-rental-how-to-card-title">{t('gpuRentalHowTo3Title')}</h3>
                            <p className="gpu-rental-how-to-card-desc">{t('gpuRentalHowTo3Desc')}</p>
                        </div>
                    </div>
                    <div className="gpu-rental-how-to-cta">
                        <button className="cta-button" onClick={onGetAccess}>
                            {t('getAccess')}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

