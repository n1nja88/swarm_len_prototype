import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../hooks/useTheme';
import { ParticleCanvas } from '../components/ParticleCanvas';

export function FreeInfrastructure({ onGetAccess }) {
    const { t } = useLanguage();
    const { isLightTheme } = useTheme();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const projectsSectionRef = useRef(null);
    const [projectsVisible, setProjectsVisible] = useState(false);
    const projectsItemRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setProjectsVisible(true);
                        // Анимация для каждого элемента отдельно
                        projectsItemRefs.current.forEach((itemRef, index) => {
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

        if (projectsSectionRef.current) {
            observer.observe(projectsSectionRef.current);
        }

        return () => {
            if (projectsSectionRef.current) {
                observer.unobserve(projectsSectionRef.current);
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
                            <h1>{t('freeInfrastructureTitle')}</h1>
                            <h2>{t('freeInfrastructureSubtitle')}</h2>
                            <div className="hero-buttons">
                                <button className="cta-button" onClick={onGetAccess}>
                                    {t('getAccess')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="free-infrastructure-focus">
                <div className="container">
                    <h2 className="free-infrastructure-focus-title">{t('freeInfrastructureFocusTitle')}</h2>
                    <div className="free-infrastructure-focus-grid">
                        <div className="free-infrastructure-focus-card">
                            <div className="free-infrastructure-focus-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="free-infrastructure-focus-card-title">{t('freeInfrastructureFocus1Title')}</h3>
                            <p className="free-infrastructure-focus-desc">{t('freeInfrastructureFocus1Desc')}</p>
                        </div>
                        <div className="free-infrastructure-focus-card">
                            <div className="free-infrastructure-focus-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="free-infrastructure-focus-card-title">{t('freeInfrastructureFocus2Title')}</h3>
                            <p className="free-infrastructure-focus-desc">{t('freeInfrastructureFocus2Desc')}</p>
                        </div>
                        <div className="free-infrastructure-focus-card">
                            <div className="free-infrastructure-focus-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="free-infrastructure-focus-card-title">{t('freeInfrastructureFocus3Title')}</h3>
                            <p className="free-infrastructure-focus-desc">{t('freeInfrastructureFocus3Desc')}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="free-infrastructure-projects" ref={projectsSectionRef}>
                <div className="container">
                    <h2 className={`free-infrastructure-projects-title ${projectsVisible ? 'visible' : ''}`}>{t('freeInfrastructureProjectsTitle')}</h2>
                    <div className="free-infrastructure-projects-items">
                        <div 
                            className="free-infrastructure-projects-item" 
                            ref={el => projectsItemRefs.current[0] = el}
                        >
                            <h3 className="free-infrastructure-projects-item-title">{t('freeInfrastructureProject1Title')}</h3>
                            <p className="free-infrastructure-projects-item-desc">{t('freeInfrastructureProject1Desc')}</p>
                        </div>
                        <div 
                            className="free-infrastructure-projects-item"
                            ref={el => projectsItemRefs.current[1] = el}
                        >
                            <h3 className="free-infrastructure-projects-item-title">{t('freeInfrastructureProject2Title')}</h3>
                            <p className="free-infrastructure-projects-item-desc">{t('freeInfrastructureProject2Desc')}</p>
                        </div>
                        <div 
                            className="free-infrastructure-projects-item"
                            ref={el => projectsItemRefs.current[2] = el}
                        >
                            <h3 className="free-infrastructure-projects-item-title">{t('freeInfrastructureProject3Title')}</h3>
                            <p className="free-infrastructure-projects-item-desc">{t('freeInfrastructureProject3Desc')}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="free-infrastructure-how-to">
                <div className="container">
                    <h2 className="free-infrastructure-how-to-title">{t('freeInfrastructureHowToTitle')}</h2>
                    <div className="free-infrastructure-how-to-grid">
                        <div className="free-infrastructure-how-to-card">
                            <div className="free-infrastructure-how-to-icon">
                                <span>1</span>
                            </div>
                            <h3 className="free-infrastructure-how-to-card-title">{t('freeInfrastructureHowTo1Title')}</h3>
                            <p className="free-infrastructure-how-to-card-desc">{t('freeInfrastructureHowTo1Desc')}</p>
                        </div>
                        <div className="free-infrastructure-how-to-card">
                            <div className="free-infrastructure-how-to-icon">
                                <span>2</span>
                            </div>
                            <h3 className="free-infrastructure-how-to-card-title">{t('freeInfrastructureHowTo2Title')}</h3>
                            <p className="free-infrastructure-how-to-card-desc">{t('freeInfrastructureHowTo2Desc')}</p>
                        </div>
                        <div className="free-infrastructure-how-to-card">
                            <div className="free-infrastructure-how-to-icon">
                                <span>3</span>
                            </div>
                            <h3 className="free-infrastructure-how-to-card-title">{t('freeInfrastructureHowTo3Title')}</h3>
                            <p className="free-infrastructure-how-to-card-desc">{t('freeInfrastructureHowTo3Desc')}</p>
                        </div>
                        <div className="free-infrastructure-how-to-card">
                            <div className="free-infrastructure-how-to-icon">
                                <span>4</span>
                            </div>
                            <h3 className="free-infrastructure-how-to-card-title">{t('freeInfrastructureHowTo4Title')}</h3>
                            <p className="free-infrastructure-how-to-card-desc">{t('freeInfrastructureHowTo4Desc')}</p>
                        </div>
                    </div>
                    <div className="free-infrastructure-how-to-cta">
                        <button className="cta-button" onClick={onGetAccess}>
                            {t('getAccess')}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

