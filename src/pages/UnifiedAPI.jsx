import { useState, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UnifiedAPI({ onGetAccess }) {
    const { t } = useLanguage();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [whyVisible, setWhyVisible] = useState(false);
    const [modelsVisible, setModelsVisible] = useState(false);
    const [circleCenterY, setCircleCenterY] = useState(null);
    const [orbitingParticles, setOrbitingParticles] = useState([]);
    const modelsSectionRef = useRef(null);
    const whySectionRef = useRef(null);
    const whyItemRefs = useRef([]);
    const animationFrameRef = useRef(null);
    const targetPositionRef = useRef({ x: 50, y: 50 });
    const particlesAnimationRef = useRef(null);
    
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
                const speed = isReturning ? 0.05 : 0.08; // Более плавная анимация
                
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
        // Более плавное растяжение с меньшей интенсивностью
        return Math.min(stretchDistance / 40 * (1 + index * 0.15), 1.2);
    };
    
    // Создаем 14 кругов с разными радиусами (без самого внутреннего) - используем useMemo для оптимизации
    const circles = useMemo(() => {
        const circleCount = 14;
        const baseRadius = 200; // Самый маленький радиус (круг 2, после удаления круга 1)
        const maxRadius = 3000; // Самый большой радиус (круг 15)
        const radiusDifference = maxRadius - baseRadius; // Разница между радиусами
        const increasedDifference = radiusDifference * 1.3; // Увеличиваем на 30%
        
        return Array.from({ length: circleCount }, (_, i) => {
            // Радиусы от маленького к большому (круг 2 - самый маленький, круг 15 - самый большой)
            const radius = baseRadius + increasedDifference * (i / (circleCount - 1));
            return {
                index: i + 2, // Начинаем с индекса 2 (круг 2)
                radius: radius,
                stretchIndex: i
            };
        });
    }, []);
    
    // Функция для получения цвета круга
    const getCircleColor = (circleIndex) => {
        const colorIndex = (circleIndex - 2) % 4;
        switch (colorIndex) {
            case 0: return 'rgba(93, 99, 255, 0.8)'; // Синий
            case 1: return 'rgba(138, 43, 226, 0.8)'; // Фиолетовый
            case 2: return 'rgba(75, 192, 192, 0.8)'; // Бирюзовый
            case 3: return 'rgba(255, 99, 132, 0.8)'; // Розовый
            default: return 'rgba(93, 99, 255, 0.8)';
        }
    };
    
    // Инициализация частиц для каждого круга
    useEffect(() => {
        if (!circles || circles.length === 0) return;
        
        const particles = [];
        circles.forEach((circle) => {
            const particlesPerCircle = 3; // Фиксируем 3 частицы для быстрой загрузки
            for (let i = 0; i < particlesPerCircle; i++) {
                const initialAngle = (Math.PI * 2 / particlesPerCircle) * i;
                // Гарантируем разные направления: чередуем направления для столкновений
                const direction = i % 2 === 0 ? 1 : -1; // Четные - по часовой, нечетные - против
                const colorIndex = (circle.index - 2) % 4;
                let color;
                switch (colorIndex) {
                    case 0: color = 'rgba(93, 99, 255, 0.8)'; break;
                    case 1: color = 'rgba(138, 43, 226, 0.8)'; break;
                    case 2: color = 'rgba(75, 192, 192, 0.8)'; break;
                    case 3: color = 'rgba(255, 99, 132, 0.8)'; break;
                    default: color = 'rgba(93, 99, 255, 0.8)';
                }
                particles.push({
                    circleIndex: circle.index,
                    radius: circle.radius,
                    angle: initialAngle,
                    angularVelocity: 0.5 * direction, // Постоянная скорость для всех частиц
                    size: 8, // Фиксированный размер для оптимизации
                    color: color
                });
            }
        });
        setOrbitingParticles(particles);
    }, [circles]);
    
    // Анимация частиц
    useEffect(() => {
        if (orbitingParticles.length === 0) {
            if (particlesAnimationRef.current) {
                cancelAnimationFrame(particlesAnimationRef.current);
                particlesAnimationRef.current = null;
            }
            return;
        }
        
        let isRunning = true;
        
        const animate = () => {
            if (!isRunning) return;
            
            setOrbitingParticles(prev => {
                if (prev.length === 0) return prev;
                
                const updated = prev.map(particle => {
                    // Обновляем угол с увеличенной скоростью
                    let newAngle = particle.angle + particle.angularVelocity * 0.02; // Увеличили множитель скорости
                    
                    // Нормализуем угол
                    if (newAngle > Math.PI * 2) newAngle -= Math.PI * 2;
                    if (newAngle < 0) newAngle += Math.PI * 2;
                    
                    return { ...particle, angle: newAngle };
                });
                
                // Оптимизированная проверка столкновений - группируем по кругам
                const particlesByCircle = {};
                updated.forEach((p, idx) => {
                    if (!particlesByCircle[p.circleIndex]) {
                        particlesByCircle[p.circleIndex] = [];
                    }
                    particlesByCircle[p.circleIndex].push({ particle: p, index: idx });
                });
                
                Object.values(particlesByCircle).forEach(circleParticles => {
                    if (circleParticles.length < 2) return;
                    
                    for (let i = 0; i < circleParticles.length; i++) {
                        for (let j = i + 1; j < circleParticles.length; j++) {
                            const p1 = circleParticles[i].particle;
                            const p2 = circleParticles[j].particle;
                            const idx1 = circleParticles[i].index;
                            const idx2 = circleParticles[j].index;
                            
                            // Вычисляем угловое расстояние
                            let angleDiff = p1.angle - p2.angle;
                            
                            // Нормализуем разницу углов в диапазон [-PI, PI]
                            if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                            else if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
                            
                            const absAngleDiff = Math.abs(angleDiff);
                            
                            // Минимальное расстояние для столкновения
                            const particleSize = Math.max(p1.size, p2.size);
                            const minDistance = (particleSize * 2) / p1.radius + 0.05;
                            
                            if (absAngleDiff < minDistance) {
                                const collisionDirection = angleDiff > 0 ? 1 : -1;
                                
                                // Мягкое столкновение
                                const tempVel = updated[idx1].angularVelocity;
                                updated[idx1].angularVelocity = -updated[idx2].angularVelocity * 0.7;
                                updated[idx2].angularVelocity = -tempVel * 0.7;
                                
                                // Раздвигаем частицы
                                const safeDistance = minDistance * 1.2;
                                let midAngle = (updated[idx1].angle + updated[idx2].angle) / 2;
                                if (midAngle < 0) midAngle += Math.PI * 2;
                                else if (midAngle > Math.PI * 2) midAngle -= Math.PI * 2;
                                
                                updated[idx1].angle = midAngle + safeDistance / 2 * collisionDirection;
                                updated[idx2].angle = midAngle - safeDistance / 2 * collisionDirection;
                                
                                // Нормализуем углы
                                if (updated[idx1].angle < 0) updated[idx1].angle += Math.PI * 2;
                                else if (updated[idx1].angle > Math.PI * 2) updated[idx1].angle -= Math.PI * 2;
                                if (updated[idx2].angle < 0) updated[idx2].angle += Math.PI * 2;
                                else if (updated[idx2].angle > Math.PI * 2) updated[idx2].angle -= Math.PI * 2;
                            }
                        }
                    }
                });
                
                return updated;
            });
            
            if (isRunning) {
                particlesAnimationRef.current = requestAnimationFrame(animate);
            }
        };
        
        particlesAnimationRef.current = requestAnimationFrame(animate);
        
        return () => {
            isRunning = false;
            if (particlesAnimationRef.current) {
                cancelAnimationFrame(particlesAnimationRef.current);
                particlesAnimationRef.current = null;
            }
        };
    }, [orbitingParticles.length]);
    
    const totalCards = 6;
    const cardsPerView = 3;

    const handleScrollLeft = () => {
        setScrollPosition(prev => Math.max(0, prev - 1));
    };

    const handleScrollRight = () => {
        setScrollPosition(prev => Math.min(totalCards - cardsPerView, prev + 1));
    };

    useEffect(() => {
        const updateCircleCenter = () => {
            if (modelsSectionRef.current) {
                const rect = modelsSectionRef.current.getBoundingClientRect();
                setCircleCenterY(rect.top + rect.height / 2);
            }
        };

        const modelsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setModelsVisible(true);
                        updateCircleCenter();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (modelsSectionRef.current) {
            modelsObserver.observe(modelsSectionRef.current);
            updateCircleCenter();
        }

        window.addEventListener('scroll', updateCircleCenter, { passive: true });
        window.addEventListener('resize', updateCircleCenter, { passive: true });

        return () => {
            if (modelsSectionRef.current) {
                modelsObserver.unobserve(modelsSectionRef.current);
            }
            window.removeEventListener('scroll', updateCircleCenter);
            window.removeEventListener('resize', updateCircleCenter);
        };
    }, []);

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
                                        const wordsToHighlight = ['Fast', 'simple', 'Быстрый', 'простой'];
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
            <section className="api-models-gallery" ref={modelsSectionRef} style={{ position: 'relative', overflow: 'visible' }}>
                <div className="hero-background" style={{ 
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100vh', 
                        zIndex: 0, 
                        pointerEvents: 'none',
                        overflow: 'visible'
                    }}>
                        <div className="concentric-circles" style={{ 
                            position: 'absolute',
                            top: circleCenterY !== null ? `${circleCenterY}px` : '50vh',
                            left: '150%', // Центр за правой границей экрана, внутренний круг не виден
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '200vh',
                            zIndex: 0
                        }}>
                            {circles.map((circle) => (
                                <div 
                                    key={circle.index}
                                    className={`circle circle-${circle.index}`}
                                    style={{
                                        '--mouse-x': '50%',
                                        '--mouse-y': '50%',
                                        '--stretch-x': `${1 + getStretch(circle.stretchIndex) * Math.abs(limitedOffsetX) / 100}`,
                                        '--stretch-y': `${1 + getStretch(circle.stretchIndex) * Math.abs(limitedOffsetY) / 100}`,
                                        '--origin-x': limitedOffsetX > 0 ? 'left' : limitedOffsetX < 0 ? 'right' : 'center',
                                        '--origin-y': limitedOffsetY > 0 ? 'top' : limitedOffsetY < 0 ? 'bottom' : 'center',
                                        width: `${circle.radius * 2}px`,
                                        height: `${circle.radius * 2}px`
                                    }}
                                >
                                    {orbitingParticles
                                        .filter(p => p.circleIndex === circle.index)
                                        .map((particle, idx) => {
                                            const centerX = circle.radius;
                                            const centerY = circle.radius;
                                            const x = centerX + Math.cos(particle.angle) * particle.radius;
                                            const y = centerY + Math.sin(particle.angle) * particle.radius;
                                            
                                            return (
                                                <div
                                                    key={`${circle.index}-${idx}`}
                                                    className="orbiting-particle"
                                                    style={{
                                                        position: 'absolute',
                                                        left: `${x}px`,
                                                        top: `${y}px`,
                                                        width: `${particle.size}px`,
                                                        height: `${particle.size}px`,
                                                        borderRadius: '50%',
                                                        backgroundColor: particle.color,
                                                        transform: 'translate(-50%, -50%)',
                                                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                                                        pointerEvents: 'none'
                                                    }}
                                                />
                                            );
                                        })}
                                </div>
                            ))}
                        </div>
                    </div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
            <section className="api-why" ref={whySectionRef} style={{ position: 'relative', zIndex: 1 }}>
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
            <section className="api-how-to" style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
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

