import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { GeometricBackground } from '../components/GeometricBackground';

export function UnifiedAPI({ onGetAccess }) {
    const { t } = useLanguage();
    const [scrollPosition, setScrollPosition] = useState(0);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const totalCards = 6;
    const cardsPerView = 3;

    const handleScrollLeft = () => {
        setScrollPosition(prev => Math.max(0, prev - 1));
    };

    const handleScrollRight = () => {
        setScrollPosition(prev => Math.min(totalCards - cardsPerView, prev + 1));
    };

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
                    <GeometricBackground type="hexagons" />
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
                            <p className="api-feature-desc">
                                {(() => {
                                    const desc = t('unifiedAPIFeature1Desc');
                                    const docText = desc.includes('Документация') ? 'Документация' : 'Documentation';
                                    const parts = desc.split(docText);
                                    return parts.map((part, index, array) => 
                                        index === array.length - 1 ? (
                                            <span key={index}>{part}</span>
                                        ) : (
                                            <span key={index}>
                                                {part}
                                                <a href="#" className="learn-more-link" onClick={(e) => e.preventDefault()}>
                                                    {docText}
                                                </a>
                                            </span>
                                        )
                                    );
                                })()}
                            </p>
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
            <section className="api-models-gallery">
                <div className="container">
                    <h2 className="api-models-title">{t('unifiedAPIModelsTitle')}</h2>
                    <div className="api-models-wrapper">
                        <button className="api-models-nav-btn api-models-nav-left" onClick={handleScrollLeft}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <div className="api-models-container">
                            <div 
                                className="api-models-scroll" 
                                style={{ transform: `translateX(-${scrollPosition * (100 / cardsPerView)}%)` }}
                            >
                                {[...Array(6)].map((_, index) => (
                                    <div key={index} className="api-model-card">
                                        {/* Пустая карточка, заполним потом */}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="api-models-nav-btn api-models-nav-right" onClick={handleScrollRight}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <div className="api-models-cta">
                        <button className="cta-button" onClick={onGetAccess}>
                            {t('getAccess')}
                        </button>
                    </div>
                </div>
            </section>
            <section className="api-why" ref={whySectionRef}>
                <div className="container">
                    <h2 className={`api-why-title ${whyVisible ? 'visible' : ''}`}>{t('unifiedAPIWhyTitle')}</h2>
                    <div className="api-why-items">
                        <div 
                            className="api-why-item" 
                            ref={el => whyItemRefs.current[0] = el}
                        >
                            <h3 className="api-why-item-title">{t('unifiedAPIWhy1Title')}</h3>
                            <p className="api-why-item-desc">{t('unifiedAPIWhy1Desc')}</p>
                        </div>
                        <div 
                            className="api-why-item"
                            ref={el => whyItemRefs.current[1] = el}
                        >
                            <h3 className="api-why-item-title">{t('unifiedAPIWhy2Title')}</h3>
                            <p className="api-why-item-desc">{t('unifiedAPIWhy2Desc')}</p>
                        </div>
                        <div 
                            className="api-why-item"
                            ref={el => whyItemRefs.current[2] = el}
                        >
                            <h3 className="api-why-item-title">{t('unifiedAPIWhy3Title')}</h3>
                            <p className="api-why-item-desc">{t('unifiedAPIWhy3Desc')}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="api-how-to">
                <div className="container">
                    <h2 className="api-how-to-title">{t('unifiedAPIHowToTitle')}</h2>
                    <div className="api-how-to-grid">
                        <div className="api-how-to-card">
                            <div className="api-how-to-icon">
                                <span>1</span>
                            </div>
                            <h3 className="api-how-to-card-title">{t('unifiedAPIHowTo1Title')}</h3>
                            <p className="api-how-to-card-desc">{t('unifiedAPIHowTo1Desc')}</p>
                        </div>
                        <div className="api-how-to-card">
                            <div className="api-how-to-icon">
                                <span>2</span>
                            </div>
                            <h3 className="api-how-to-card-title">{t('unifiedAPIHowTo2Title')}</h3>
                            <p className="api-how-to-card-desc">{t('unifiedAPIHowTo2Desc')}</p>
                        </div>
                        <div className="api-how-to-card">
                            <div className="api-how-to-icon">
                                <span>3</span>
                            </div>
                            <h3 className="api-how-to-card-title">{t('unifiedAPIHowTo3Title')}</h3>
                            <p className="api-how-to-card-desc">{t('unifiedAPIHowTo3Desc')}</p>
                        </div>
                        <div className="api-how-to-card">
                            <div className="api-how-to-icon">
                                <span>4</span>
                            </div>
                            <h3 className="api-how-to-card-title">{t('unifiedAPIHowTo4Title')}</h3>
                            <p className="api-how-to-card-desc">{t('unifiedAPIHowTo4Desc')}</p>
                        </div>
                    </div>
                    <div className="api-how-to-cta">
                        <button className="cta-button" onClick={onGetAccess}>
                            {t('getAccess')}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

