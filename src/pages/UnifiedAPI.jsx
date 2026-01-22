import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UnifiedAPI({ onGetAccess }) {
    const { t } = useLanguage();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const modelsSectionRef = useRef(null);
    const animationFrameRef = useRef(null);
    const targetPositionRef = useRef({ x: 50, y: 50 });
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        const updatePosition = () => {
            setMousePosition(prev => {
                const dx = targetPositionRef.current.x - prev.x;
                const dy = targetPositionRef.current.y - prev.y;
                
                const distance = Math.sqrt(dx * dx + dy * dy);
                const isReturning = Math.abs(targetPositionRef.current.x - 50) < 1 && Math.abs(targetPositionRef.current.y - 50) < 1;
                const speed = isReturning ? 0.08 : 0.15;
                
                if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
                    return targetPositionRef.current;
                }
                
                return {
                    x: prev.x + dx * speed,
                    y: prev.y + dy * speed
                };
            });
            
            animationFrameRef.current = requestAnimationFrame(updatePosition);
        };

        const handleMouseMove = (e) => {
            if (modelsSectionRef.current) {
                const rect = modelsSectionRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;
                
                const maxOffset = Math.min(window.innerWidth, window.innerHeight) * 0.5;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                let limitedDeltaX = deltaX;
                let limitedDeltaY = deltaY;
                
                if (distance > maxOffset) {
                    const ratio = maxOffset / distance;
                    limitedDeltaX = deltaX * ratio;
                    limitedDeltaY = deltaY * ratio;
                }
                
                const offsetX = limitedDeltaX * 0.3;
                const offsetY = limitedDeltaY * 0.3;
                
                targetPositionRef.current = {
                    x: 50 + (offsetX / window.innerWidth) * 100,
                    y: 50 + (offsetY / window.innerHeight) * 100
                };
            }
        };

        const handleMouseLeave = () => {
            targetPositionRef.current = { x: 50, y: 50 };
        };

        const heroElement = modelsSectionRef.current;
        if (heroElement) {
            animationFrameRef.current = requestAnimationFrame(updatePosition);
            window.addEventListener('mousemove', handleMouseMove, { passive: true });
            window.addEventListener('mouseleave', handleMouseLeave);
            
            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);
    
    const offsetX = mousePosition.x - 50;
    const offsetY = mousePosition.y - 50;
    
    const circle1Radius = 10.7;
    const circle2Radius = 35.7;
    
    const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    const maxDistance = circle2Radius - circle1Radius - 1;
    
    let limitedOffsetX = offsetX;
    let limitedOffsetY = offsetY;
    
    if (distance > maxDistance) {
        const ratio = maxDistance / distance;
        limitedOffsetX = offsetX * ratio;
        limitedOffsetY = offsetY * ratio;
    }
    
    const getStretch = (index) => {
        const stretchDistance = Math.sqrt(limitedOffsetX * limitedOffsetX + limitedOffsetY * limitedOffsetY);
        return Math.min(stretchDistance / 30 * (1 + index * 0.2), 1.5);
    };
    const totalCards = 6;
    const cardsPerView = 3;

    const handleScrollLeft = () => {
        setScrollPosition(prev => Math.max(0, prev - 1));
    };

    const handleScrollRight = () => {
        setScrollPosition(prev => Math.min(totalCards - cardsPerView, prev + 1));
    };

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
        <div className="page page-unified-api">
            <section className="hero">
                <div className="hero-background">
                </div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>
                                {(() => {
                                    const title = t('unifiedAPITitle');
                                    const highlightWords = (text) => {
                                        const wordsToHighlight = ['API', 'AI'];
                                        const parts = [];
                                        let lastIndex = 0;
                                        const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
                                        let match;
                                        
                                        while ((match = regex.exec(text)) !== null) {
                                            if (match.index > lastIndex) {
                                                parts.push({ text: text.substring(lastIndex, match.index), isHighlight: false });
                                            }
                                            parts.push({ text: match[0], isHighlight: true });
                                            lastIndex = regex.lastIndex;
                                        }
                                        
                                        if (lastIndex < text.length) {
                                            parts.push({ text: text.substring(lastIndex), isHighlight: false });
                                        }
                                        
                                        return parts.map((item, i) => 
                                            item.isHighlight ? (
                                                <span key={i} style={{ color: '#7a80d0' }}>{item.text}</span>
                                            ) : (
                                                <span key={i}>{item.text}</span>
                                            )
                                        );
                                    };
                                    
                                    return highlightWords(title);
                                })()}
                            </h1>
                            <h2>
                                {(() => {
                                    const subtitle = t('unifiedAPISubtitle');
                                    const highlightWords = (text) => {
                                        const wordsToHighlight = ['Fast', 'simple', 'AI', 'Быстрый', 'простой', 'AI'];
                                        const parts = [];
                                        let lastIndex = 0;
                                        const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
                                        let match;
                                        
                                        while ((match = regex.exec(text)) !== null) {
                                            if (match.index > lastIndex) {
                                                parts.push({ text: text.substring(lastIndex, match.index), isHighlight: false });
                                            }
                                            parts.push({ text: match[0], isHighlight: true });
                                            lastIndex = regex.lastIndex;
                                        }
                                        
                                        if (lastIndex < text.length) {
                                            parts.push({ text: text.substring(lastIndex), isHighlight: false });
                                        }
                                        
                                        return parts.map((item, i) => 
                                            item.isHighlight ? (
                                                <span key={i} style={{ color: '#7a80d0' }}>{item.text}</span>
                                            ) : (
                                                <span key={i}>{item.text}</span>
                                            )
                                        );
                                    };
                                    
                                    return highlightWords(subtitle);
                                })()}
                            </h2>
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
                    <h2 className="api-features-title">
                        {(() => {
                            const title = t('unifiedAPIFeaturesTitle');
                            const highlightWords = (text) => {
                                const wordsToHighlight = ['Fast', 'simple', 'AI', 'Быстрый', 'простой', 'AI'];
                                const parts = [];
                                let lastIndex = 0;
                                const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
                                let match;
                                
                                while ((match = regex.exec(text)) !== null) {
                                    if (match.index > lastIndex) {
                                        parts.push({ text: text.substring(lastIndex, match.index), isHighlight: false });
                                    }
                                    parts.push({ text: match[0], isHighlight: true });
                                    lastIndex = regex.lastIndex;
                                }
                                
                                if (lastIndex < text.length) {
                                    parts.push({ text: text.substring(lastIndex), isHighlight: false });
                                }
                                
                                return parts.map((item, i) => 
                                    item.isHighlight ? (
                                        <span key={i} style={{ color: '#7a80d0' }}>{item.text}</span>
                                    ) : (
                                        <span key={i}>{item.text}</span>
                                    )
                                );
                            };
                            
                            return highlightWords(title);
                        })()}
                    </h2>
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
            <section className="api-models-gallery" ref={modelsSectionRef}>
                <div className="hero-background" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
                    <div className="concentric-circles">
                        <div 
                            className="circle circle-2"
                            style={{
                                '--mouse-x': '50%',
                                '--mouse-y': '50%',
                                '--stretch-x': `${1 + getStretch(1) * Math.abs(limitedOffsetX) / 100}`,
                                '--stretch-y': `${1 + getStretch(1) * Math.abs(limitedOffsetY) / 100}`,
                                '--origin-x': limitedOffsetX > 0 ? 'left' : limitedOffsetX < 0 ? 'right' : 'center',
                                '--origin-y': limitedOffsetY > 0 ? 'top' : limitedOffsetY < 0 ? 'bottom' : 'center'
                            }}
                        ></div>
                        <div 
                            className="circle circle-3"
                            style={{
                                '--mouse-x': '50%',
                                '--mouse-y': '50%',
                                '--stretch-x': `${1 + getStretch(2) * Math.abs(limitedOffsetX) / 100}`,
                                '--stretch-y': `${1 + getStretch(2) * Math.abs(limitedOffsetY) / 100}`,
                                '--origin-x': limitedOffsetX > 0 ? 'left' : limitedOffsetX < 0 ? 'right' : 'center',
                                '--origin-y': limitedOffsetY > 0 ? 'top' : limitedOffsetY < 0 ? 'bottom' : 'center'
                            }}
                        ></div>
                        <div 
                            className="circle circle-4"
                            style={{
                                '--mouse-x': '50%',
                                '--mouse-y': '50%',
                                '--stretch-x': `${1 + getStretch(3) * Math.abs(limitedOffsetX) / 100}`,
                                '--stretch-y': `${1 + getStretch(3) * Math.abs(limitedOffsetY) / 100}`,
                                '--origin-x': limitedOffsetX > 0 ? 'left' : limitedOffsetX < 0 ? 'right' : 'center',
                                '--origin-y': limitedOffsetY > 0 ? 'top' : limitedOffsetY < 0 ? 'bottom' : 'center'
                            }}
                        ></div>
                        <div 
                            className="circle circle-5"
                            style={{
                                '--mouse-x': '50%',
                                '--mouse-y': '50%',
                                '--stretch-x': `${1 + getStretch(4) * Math.abs(limitedOffsetX) / 100}`,
                                '--stretch-y': `${1 + getStretch(4) * Math.abs(limitedOffsetY) / 100}`,
                                '--origin-x': limitedOffsetX > 0 ? 'left' : limitedOffsetX < 0 ? 'right' : 'center',
                                '--origin-y': limitedOffsetY > 0 ? 'top' : limitedOffsetY < 0 ? 'bottom' : 'center'
                            }}
                        ></div>
                    </div>
                </div>
                <div className="hero-background" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
                    <div className="concentric-circles">
                        <div 
                            className="circle circle-2"
                            style={{
                                '--mouse-x': '50%',
                                '--mouse-y': '50%',
                                '--stretch-x': `${1 + getStretch(1) * Math.abs(limitedOffsetX) / 100}`,
                                '--stretch-y': `${1 + getStretch(1) * Math.abs(limitedOffsetY) / 100}`,
                                '--origin-x': limitedOffsetX > 0 ? 'left' : limitedOffsetX < 0 ? 'right' : 'center',
                                '--origin-y': limitedOffsetY > 0 ? 'top' : limitedOffsetY < 0 ? 'bottom' : 'center'
                            }}
                        ></div>
                        <div 
                            className="circle circle-3"
                            style={{
                                '--mouse-x': '50%',
                                '--mouse-y': '50%',
                                '--stretch-x': `${1 + getStretch(2) * Math.abs(limitedOffsetX) / 100}`,
                                '--stretch-y': `${1 + getStretch(2) * Math.abs(limitedOffsetY) / 100}`,
                                '--origin-x': limitedOffsetX > 0 ? 'left' : limitedOffsetX < 0 ? 'right' : 'center',
                                '--origin-y': limitedOffsetY > 0 ? 'top' : limitedOffsetY < 0 ? 'bottom' : 'center'
                            }}
                        ></div>
                        <div 
                            className="circle circle-4"
                            style={{
                                '--mouse-x': '50%',
                                '--mouse-y': '50%',
                                '--stretch-x': `${1 + getStretch(3) * Math.abs(limitedOffsetX) / 100}`,
                                '--stretch-y': `${1 + getStretch(3) * Math.abs(limitedOffsetY) / 100}`,
                                '--origin-x': limitedOffsetX > 0 ? 'left' : limitedOffsetX < 0 ? 'right' : 'center',
                                '--origin-y': limitedOffsetY > 0 ? 'top' : limitedOffsetY < 0 ? 'bottom' : 'center'
                            }}
                        ></div>
                        <div 
                            className="circle circle-5"
                            style={{
                                '--mouse-x': '50%',
                                '--mouse-y': '50%',
                                '--stretch-x': `${1 + getStretch(4) * Math.abs(limitedOffsetX) / 100}`,
                                '--stretch-y': `${1 + getStretch(4) * Math.abs(limitedOffsetY) / 100}`,
                                '--origin-x': limitedOffsetX > 0 ? 'left' : limitedOffsetX < 0 ? 'right' : 'center',
                                '--origin-y': limitedOffsetY > 0 ? 'top' : limitedOffsetY < 0 ? 'bottom' : 'center'
                            }}
                        ></div>
                    </div>
                </div>
                <div className="container">
                    <h2 className="api-models-title">
                        {(() => {
                            const title = t('unifiedAPIModelsTitle');
                            const highlightWords = (text) => {
                                const parts = [];
                                
                                // Ищем "AI solutions store" или "магазин AI решений"
                                if (text.includes('AI solutions store')) {
                                    const index = text.indexOf('AI solutions store');
                                    if (index > 0) parts.push({ text: text.substring(0, index), isHighlight: false });
                                    parts.push({ text: 'AI solutions store', isHighlight: true });
                                    if (index + 'AI solutions store'.length < text.length) {
                                        parts.push({ text: text.substring(index + 'AI solutions store'.length), isHighlight: false });
                                    }
                                } else if (text.includes('магазин AI решений')) {
                                    const index = text.indexOf('магазин AI решений');
                                    if (index > 0) parts.push({ text: text.substring(0, index), isHighlight: false });
                                    parts.push({ text: 'магазин AI решений', isHighlight: true });
                                    if (index + 'магазин AI решений'.length < text.length) {
                                        parts.push({ text: text.substring(index + 'магазин AI решений'.length), isHighlight: false });
                                    }
                                } else {
                                    parts.push({ text: title, isHighlight: false });
                                }
                                
                                return parts.map((item, i) => 
                                    item.isHighlight ? (
                                        <span key={i} style={{ color: '#7a80d0' }}>{item.text}</span>
                                    ) : (
                                        <span key={i}>{item.text}</span>
                                    )
                                );
                            };
                            
                            return highlightWords(title);
                        })()}
                    </h2>
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
                    <h2 className={`api-why-title ${whyVisible ? 'visible' : ''}`}>
                        {(() => {
                            const title = t('unifiedAPIWhyTitle');
                            const highlightWords = (text) => {
                                const wordsToHighlight = ['AI', 'AI'];
                                const parts = [];
                                let lastIndex = 0;
                                const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
                                let match;
                                
                                while ((match = regex.exec(text)) !== null) {
                                    if (match.index > lastIndex) {
                                        parts.push({ text: text.substring(lastIndex, match.index), isHighlight: false });
                                    }
                                    parts.push({ text: match[0], isHighlight: true });
                                    lastIndex = regex.lastIndex;
                                }
                                
                                if (lastIndex < text.length) {
                                    parts.push({ text: text.substring(lastIndex), isHighlight: false });
                                }
                                
                                return parts.map((item, i) => 
                                    item.isHighlight ? (
                                        <span key={i} style={{ color: '#7a80d0' }}>{item.text}</span>
                                    ) : (
                                        <span key={i}>{item.text}</span>
                                    )
                                );
                            };
                            
                            return highlightWords(title);
                        })()}
                    </h2>
                    <div className="api-why-items">
                        <div 
                            className="api-why-item" 
                            ref={el => whyItemRefs.current[0] = el}
                        >
                            <h3 className="api-why-item-title">{t('unifiedAPIWhy1Title')}</h3>
                            <p className="api-why-item-desc">{t('unifiedAPIWhy1Desc')}</p>
                        </div>
                        <div 
                            className={`api-why-divider-wrapper ${whyVisible ? 'visible' : ''}`}
                        >
                            <div className="api-why-divider api-why-divider-title"></div>
                            <div className="api-why-divider api-why-divider-desc"></div>
                        </div>
                        <div 
                            className="api-why-item"
                            ref={el => whyItemRefs.current[1] = el}
                        >
                            <h3 className="api-why-item-title">{t('unifiedAPIWhy2Title')}</h3>
                            <p className="api-why-item-desc">{t('unifiedAPIWhy2Desc')}</p>
                        </div>
                        <div 
                            className={`api-why-divider-wrapper ${whyVisible ? 'visible' : ''}`}
                        >
                            <div className="api-why-divider api-why-divider-title"></div>
                            <div className="api-why-divider api-why-divider-desc"></div>
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
                    <h2 className="api-how-to-title">
                        {(() => {
                            const title = t('unifiedAPIHowToTitle');
                            const highlightWords = (text) => {
                                const wordsToHighlight = ['start working', 'Swarmind', 'начать работу', 'Swarmind'];
                                const parts = [];
                                let lastIndex = 0;
                                
                                // Сначала ищем полную фразу "start working" или "начать работу"
                                if (text.includes('start working')) {
                                    const index = text.indexOf('start working');
                                    if (index > 0) parts.push({ text: text.substring(0, index), isHighlight: false });
                                    parts.push({ text: 'start working', isHighlight: true });
                                    lastIndex = index + 'start working'.length;
                                } else if (text.includes('начать работу')) {
                                    const index = text.indexOf('начать работу');
                                    if (index > 0) parts.push({ text: text.substring(0, index), isHighlight: false });
                                    parts.push({ text: 'начать работу', isHighlight: true });
                                    lastIndex = index + 'начать работу'.length;
                                }
                                
                                // Затем ищем Swarmind
                                const swarmindIndex = text.indexOf('Swarmind', lastIndex);
                                if (swarmindIndex !== -1) {
                                    if (swarmindIndex > lastIndex) {
                                        parts.push({ text: text.substring(lastIndex, swarmindIndex), isHighlight: false });
                                    }
                                    parts.push({ text: 'Swarmind', isHighlight: true });
                                    lastIndex = swarmindIndex + 'Swarmind'.length;
                                }
                                
                                if (lastIndex < text.length) {
                                    parts.push({ text: text.substring(lastIndex), isHighlight: false });
                                }
                                
                                return parts.length > 0 ? parts.map((item, i) => 
                                    item.isHighlight ? (
                                        <span key={i} style={{ color: '#7a80d0' }}>{item.text}</span>
                                    ) : (
                                        <span key={i}>{item.text}</span>
                                    )
                                ) : title;
                            };
                            
                            return highlightWords(title);
                        })()}
                    </h2>
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

