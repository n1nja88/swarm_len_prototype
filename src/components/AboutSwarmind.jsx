import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

// Компонент секции "О Swarmind"
export function AboutSwarmind({ onGetAccess }) {
    const { t } = useLanguage();
    const [rotation, setRotation] = useState(90);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            
            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Находим кнопку Get Access в секции More possibilities
            const morePossibilitiesBtn = document.querySelector('.more-possibilities .cta-button');
            
            // Точка старта анимации - когда "More possibilities" в центре экрана
            const triggerPoint = rect.bottom - viewportHeight * 0.5;
            
            // Анимация начинается только после triggerPoint
            if (triggerPoint > 0) {
                // Ещё не дошли до точки старта - держим фиксированный угол
                setRotation(90);
            } else {
                let progress = 0;
                
                if (morePossibilitiesBtn) {
                    const btnRect = morePossibilitiesBtn.getBoundingClientRect();
                    // Финал когда кнопка Get Access в More possibilities видна на экране
                    const btnVisible = btnRect.top < viewportHeight;
                    
                    if (btnVisible) {
                        progress = 1;
                    } else {
                        // Прогресс от старта до появления кнопки
                        const distanceToBtn = btnRect.top - viewportHeight;
                        const totalDistance = Math.abs(triggerPoint) + distanceToBtn;
                        progress = Math.min(1, Math.abs(triggerPoint) / (totalDistance + Math.abs(triggerPoint)));
                    }
                } else {
                    const scrolledPast = Math.abs(triggerPoint);
                    progress = Math.min(1, scrolledPast / 800);
                }
                
                // От 90° до 149° (финальное положение)
                const newRotation = 90 + progress * 59;
                setRotation(newRotation);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="about-swar" ref={sectionRef}>
            <svg
                className="left-triangle"
                viewBox="0 0 346 400"
                preserveAspectRatio="xMidYMid meet"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                <defs>
                    <filter id="triangleGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="rgba(255, 99, 132, 0.5)" />
                        <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="rgba(255, 99, 132, 0.3)" />
                        <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="rgba(255, 99, 132, 0.2)" />
                    </filter>
                </defs>
                <path
                    d="M0 0 L346 200 L0 400 Z"
                    fill="none"
                    stroke="rgba(255, 99, 132, 0.5)"
                    strokeWidth="1"
                    filter="url(#triangleGlow)"
                />
            </svg>
            
            <div className="container">
                <div className="about-swar-content">
                    <div className="about-swar-left">
                        <h2>
                            {t('aboutSwarMind').split('Swarmind').map((part, i, arr) => 
                                i === arr.length - 1 ? (
                                    <span key={i}>{part}</span>
                                ) : (
                                    <span key={i}>
                                        {part}
                                        <span className="accent-text">Swarmind</span>
                                    </span>
                                )
                            )}
                        </h2>
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
                                <Link to="/unified-api" className="learn-more-link">
                                    {t('learnMore')}
                                </Link>
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
                                <Link to="/gpu-rental" className="learn-more-link">
                                    {t('learnMore')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}




