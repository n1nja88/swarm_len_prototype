/**
 * Страница "GPU Rental"
 * Информация об аренде GPU серверов
 * Включает анимацию треугольников, реагирующих на движение мыши
 */
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function GPURental({ onGetAccess }) {
    const { t } = useLanguage();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    // Анимация треугольников при движении мыши
    const heroRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const animationFrameRef = useRef(null);
    const targetPositionRef = useRef({ x: 50, y: 50 });

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
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = e.clientX - rect.left - centerX;
                const deltaY = e.clientY - rect.top - centerY;
                
                const maxOffset = Math.min(rect.width, rect.height) * 0.4;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                let limitedDeltaX = deltaX;
                let limitedDeltaY = deltaY;
                
                if (distance > maxOffset) {
                    const ratio = maxOffset / distance;
                    limitedDeltaX = deltaX * ratio;
                    limitedDeltaY = deltaY * ratio;
                }
                
                const offsetX = limitedDeltaX * 0.2;
                const offsetY = limitedDeltaY * 0.2;
                
                targetPositionRef.current = {
                    x: 50 + (offsetX / rect.width) * 100,
                    y: 50 + (offsetY / rect.height) * 100
                };
            }
        };

        const handleMouseLeave = () => {
            targetPositionRef.current = { x: 50, y: 50 };
        };

        const heroElement = heroRef.current;
        if (heroElement) {
            animationFrameRef.current = requestAnimationFrame(updatePosition);
            heroElement.addEventListener('mousemove', handleMouseMove, { passive: true });
            heroElement.addEventListener('mouseleave', handleMouseLeave);
            
            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
                heroElement.removeEventListener('mousemove', handleMouseMove);
                heroElement.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);
    
    const offsetX = mousePosition.x - 50;
    const offsetY = mousePosition.y - 50;
    
    const tasksSectionRef = useRef(null);
    const [tasksVisible, setTasksVisible] = useState(false);
    const taskCardRefs = useRef([]);

    const whySectionRef = useRef(null);
    const [whyVisible, setWhyVisible] = useState(false);
    const whyItemRefs = useRef([]);
    const [whyMousePosition, setWhyMousePosition] = useState({ x: 50, y: 50 });
    const whyAnimationFrameRef = useRef(null);
    const whyTargetPositionRef = useRef({ x: 50, y: 50 });

    useEffect(() => {
        const updateWhyPosition = () => {
            setWhyMousePosition(prev => {
                const dx = whyTargetPositionRef.current.x - prev.x;
                const dy = whyTargetPositionRef.current.y - prev.y;
                
                const distance = Math.sqrt(dx * dx + dy * dy);
                const isReturning = Math.abs(whyTargetPositionRef.current.x - 50) < 1 && Math.abs(whyTargetPositionRef.current.y - 50) < 1;
                const speed = isReturning ? 0.08 : 0.15;
                
                if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
                    return whyTargetPositionRef.current;
                }
                
                return {
                    x: prev.x + dx * speed,
                    y: prev.y + dy * speed
                };
            });
            
            whyAnimationFrameRef.current = requestAnimationFrame(updateWhyPosition);
        };

        const handleWhyMouseMove = (e) => {
            if (whySectionRef.current) {
                const rect = whySectionRef.current.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = e.clientX - rect.left - centerX;
                const deltaY = e.clientY - rect.top - centerY;
                
                const maxOffset = Math.min(rect.width, rect.height) * 0.4;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                let limitedDeltaX = deltaX;
                let limitedDeltaY = deltaY;
                
                if (distance > maxOffset) {
                    const ratio = maxOffset / distance;
                    limitedDeltaX = deltaX * ratio;
                    limitedDeltaY = deltaY * ratio;
                }
                
                const offsetX = limitedDeltaX * 0.25;
                const offsetY = limitedDeltaY * 0.25;
                
                whyTargetPositionRef.current = {
                    x: 50 + (offsetX / rect.width) * 100,
                    y: 50 + (offsetY / rect.height) * 100
                };
            }
        };

        const handleWhyMouseLeave = () => {
            whyTargetPositionRef.current = { x: 50, y: 50 };
        };

        const whyElement = whySectionRef.current;
        if (whyElement) {
            whyAnimationFrameRef.current = requestAnimationFrame(updateWhyPosition);
            whyElement.addEventListener('mousemove', handleWhyMouseMove, { passive: true });
            whyElement.addEventListener('mouseleave', handleWhyMouseLeave);
            
            return () => {
                if (whyAnimationFrameRef.current) {
                    cancelAnimationFrame(whyAnimationFrameRef.current);
                }
                if (whyElement) {
                    whyElement.removeEventListener('mousemove', handleWhyMouseMove);
                    whyElement.removeEventListener('mouseleave', handleWhyMouseLeave);
                }
            };
        }
    }, []);

    const whyOffsetX = whyMousePosition.x - 50;
    const whyOffsetY = whyMousePosition.y - 50;

    const getWhyTriangleRotation = (index) => {
        const distance = Math.sqrt(whyOffsetX * whyOffsetX + whyOffsetY * whyOffsetY);
        const rotationAngle = Math.atan2(whyOffsetY, whyOffsetX) * (180 / Math.PI);
        const rotationIntensity = Math.min(distance * 0.625, 6.25);
        const directionMultiplier = (index % 2 === 0) ? 1 : -1;
        const intensityMultiplier = 0.375 + (index % 3) * 0.2;
        return rotationAngle * directionMultiplier * intensityMultiplier * (rotationIntensity / 6.25);
    };

    useEffect(() => {
        const tasksObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTasksVisible(true);
                        // Анимация для каждой карточки отдельно
                        taskCardRefs.current.forEach((cardRef, index) => {
                            if (cardRef) {
                                setTimeout(() => {
                                    cardRef.classList.add('visible');
                                }, index * 150);
                            }
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (tasksSectionRef.current) {
            tasksObserver.observe(tasksSectionRef.current);
        }

        return () => {
            if (tasksSectionRef.current) {
                tasksObserver.unobserve(tasksSectionRef.current);
            }
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

    // Функция для вычисления угла вращения треугольников (скорость снижена еще в два раза)
    const getTriangleRotation = (index) => {
        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        const rotationAngle = Math.atan2(offsetY, offsetX) * (180 / Math.PI);
        const rotationIntensity = Math.min(distance * 0.625, 6.25); // Еще в два раза меньше
        const directionMultiplier = (index % 2 === 0) ? 1 : -1;
        const intensityMultiplier = 0.375 + (index % 3) * 0.2; // Еще в два раза меньше
        return rotationAngle * directionMultiplier * intensityMultiplier * (rotationIntensity / 6.25);
    };

    return (
        <div className="page page-gpu-rental">
            <section className="hero" ref={heroRef}>
                <div className="hero-background">
                    <svg className="triangle-grid" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                        <defs>
                            <linearGradient id="triGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(93, 99, 255, 0.5)" />
                                <stop offset="100%" stopColor="rgba(138, 43, 226, 0.4)" />
                            </linearGradient>
                            <linearGradient id="triGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(138, 43, 226, 0.45)" />
                                <stop offset="100%" stopColor="rgba(75, 192, 192, 0.35)" />
                            </linearGradient>
                            <linearGradient id="triGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(75, 192, 192, 0.4)" />
                                <stop offset="100%" stopColor="rgba(255, 99, 132, 0.3)" />
                            </linearGradient>
                            <filter id="triGlow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        {[...Array(12)].map((_, i) => {
                            // Более хаотичное расположение треугольников
                            const positions = [
                                { x: 100, y: 120 }, { x: 350, y: 80 }, { x: 600, y: 150 }, { x: 850, y: 100 },
                                { x: 180, y: 380 }, { x: 450, y: 420 }, { x: 720, y: 350 }, { x: 950, y: 400 },
                                { x: 120, y: 650 }, { x: 400, y: 680 }, { x: 680, y: 620 }, { x: 880, y: 700 }
                            ];
                            const pos = positions[i] || { x: 150 + (i % 4) * 250, y: 150 + Math.floor(i / 4) * 300 };
                            const x = pos.x;
                            const y = pos.y;
                            const size = 70 + (i % 4) * 25 + (i % 5) * 15; // Разные размеры без random
                            const baseRotation = (i * 37 + i * 13) % 360; // Более хаотичные базовые углы
                            const mouseRotation = getTriangleRotation(i);
                            const totalRotation = baseRotation + mouseRotation;
                            
                            return (
                                <g key={i} transform={`translate(${x}, ${y}) rotate(${totalRotation})`}>
                                    <polygon
                                        points={`0,${-size} ${size * 0.866},${size * 0.5} ${-size * 0.866},${size * 0.5}`}
                                        fill="none"
                                        stroke={`url(#triGradient${(i % 3) + 1})`}
                                        strokeWidth="1.5"
                                        filter="url(#triGlow)"
                                        opacity="0.65"
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1>
                                {(() => {
                                    const title = t('gpuRentalTitle');
                                    // Функция для покраски только "GPU" и "Rental"/"rent"
                                    const highlightWords = (text) => {
                                        const wordsToHighlight = ['GPU', 'Rental', 'rent', 'аренда'];
                                        const parts = [];
                                        let lastIndex = 0;
                                        
                                        // Создаем регулярное выражение для поиска всех слов
                                        const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
                                        let match;
                                        
                                        while ((match = regex.exec(text)) !== null) {
                                            // Добавляем текст до совпадения
                                            if (match.index > lastIndex) {
                                                parts.push({ text: text.substring(lastIndex, match.index), isHighlight: false });
                                            }
                                            // Добавляем совпавшее слово
                                            parts.push({ text: match[0], isHighlight: true });
                                            lastIndex = regex.lastIndex;
                                        }
                                        
                                        // Добавляем оставшийся текст
                                        if (lastIndex < text.length) {
                                            parts.push({ text: text.substring(lastIndex), isHighlight: false });
                                        }
                                        
                                        return parts.map((item, i) => 
                                            item.isHighlight ? (
                                                <span key={i} style={{ color: '#ff6384' }}>{item.text}</span>
                                            ) : (
                                                <span key={i}>{item.text}</span>
                                            )
                                        );
                                    };
                                    
                                    return highlightWords(title);
                                })()}
                            </h1>
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
            <section className="gpu-rental-tasks" ref={tasksSectionRef}>
                <div className="container">
                    <h2 className={`gpu-rental-tasks-title ${tasksVisible ? 'visible' : ''}`}>
                        {(() => {
                            const title = t('gpuRentalTasksTitle');
                            // Функция для покраски "GPU" и "servers"
                            const highlightWords = (text) => {
                                const wordsToHighlight = ['GPU', 'servers', 'сервера'];
                                const parts = [];
                                let lastIndex = 0;
                                
                                // Создаем регулярное выражение для поиска всех слов
                                const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
                                let match;
                                
                                while ((match = regex.exec(text)) !== null) {
                                    // Добавляем текст до совпадения
                                    if (match.index > lastIndex) {
                                        parts.push({ text: text.substring(lastIndex, match.index), isHighlight: false });
                                    }
                                    // Добавляем совпавшее слово
                                    parts.push({ text: match[0], isHighlight: true });
                                    lastIndex = regex.lastIndex;
                                }
                                
                                // Добавляем оставшийся текст
                                if (lastIndex < text.length) {
                                    parts.push({ text: text.substring(lastIndex), isHighlight: false });
                                }
                                
                                return parts.map((item, i) => 
                                    item.isHighlight ? (
                                        <span key={i} style={{ color: '#ff6384' }}>{item.text}</span>
                                    ) : (
                                        <span key={i}>{item.text}</span>
                                    )
                                );
                            };
                            
                            return highlightWords(title);
                        })()}
                    </h2>
                    <div className="gpu-rental-tasks-grid">
                        <div 
                            className="gpu-rental-task-card"
                            ref={el => taskCardRefs.current[0] = el}
                        >
                            <h3 className="gpu-rental-task-title">{t('gpuRentalTask1Title')}</h3>
                            <p className="gpu-rental-task-desc">{t('gpuRentalTask1Desc')}</p>
                        </div>
                        <div 
                            className="gpu-rental-task-card"
                            ref={el => taskCardRefs.current[1] = el}
                        >
                            <h3 className="gpu-rental-task-title">{t('gpuRentalTask2Title')}</h3>
                            <p className="gpu-rental-task-desc">{t('gpuRentalTask2Desc')}</p>
                        </div>
                        <div 
                            className="gpu-rental-task-card"
                            ref={el => taskCardRefs.current[2] = el}
                        >
                            <h3 className="gpu-rental-task-title">{t('gpuRentalTask3Title')}</h3>
                            <p className="gpu-rental-task-desc">{t('gpuRentalTask3Desc')}</p>
                        </div>
                        <div 
                            className="gpu-rental-task-card"
                            ref={el => taskCardRefs.current[3] = el}
                        >
                            <h3 className="gpu-rental-task-title">{t('gpuRentalTask4Title')}</h3>
                            <p className="gpu-rental-task-desc">{t('gpuRentalTask4Desc')}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="gpu-rental-why" ref={whySectionRef}>
                <div className="why-triangles-background">
                    <svg className="why-triangle-grid" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                        <defs>
                            <linearGradient id="whyTriGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(93, 99, 255, 0.4)" />
                                <stop offset="100%" stopColor="rgba(138, 43, 226, 0.3)" />
                            </linearGradient>
                            <linearGradient id="whyTriGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(138, 43, 226, 0.35)" />
                                <stop offset="100%" stopColor="rgba(75, 192, 192, 0.25)" />
                            </linearGradient>
                            <linearGradient id="whyTriGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(75, 192, 192, 0.3)" />
                                <stop offset="100%" stopColor="rgba(255, 99, 132, 0.2)" />
                            </linearGradient>
                            <filter id="whyTriGlow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        {[...Array(6)].map((_, i) => {
                            // Другое расположение - более разбросанное
                            const positions = [
                                { x: 200, y: 150 }, { x: 750, y: 200 },
                                { x: 150, y: 500 }, { x: 800, y: 550 },
                                { x: 300, y: 800 }, { x: 700, y: 750 }
                            ];
                            const pos = positions[i] || { x: 200 + (i % 3) * 300, y: 200 + Math.floor(i / 3) * 300 };
                            const x = pos.x;
                            const y = pos.y;
                            const size = 60 + (i % 3) * 20;
                            const baseRotation = (i * 60 + i * 23) % 360;
                            const mouseRotation = getWhyTriangleRotation(i);
                            const totalRotation = baseRotation + mouseRotation;
                            
                            return (
                                <g key={i} transform={`translate(${x}, ${y}) rotate(${totalRotation})`}>
                                    <polygon
                                        points={`0,${-size} ${size * 0.866},${size * 0.5} ${-size * 0.866},${size * 0.5}`}
                                        fill="none"
                                        stroke={`url(#whyTriGradient${(i % 3) + 1})`}
                                        strokeWidth="1.5"
                                        filter="url(#whyTriGlow)"
                                        opacity="0.5"
                                    />
                                </g>
                            );
                        })}
                    </svg>
                </div>
                <div className="container">
                    <h2 className={`gpu-rental-why-title ${whyVisible ? 'visible' : ''}`}>
                        {(() => {
                            const title = t('gpuRentalWhyTitle');
                            // Функция для покраски "rent", "GPU" и "server"
                            const highlightWords = (text) => {
                                // Используем более точное регулярное выражение с границами слов
                                const wordsToHighlight = ['rent', 'GPU', 'server', 'арендовать', 'сервер'];
                                const parts = [];
                                let lastIndex = 0;
                                
                                // Создаем регулярное выражение для поиска всех слов
                                const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
                                let match;
                                
                                while ((match = regex.exec(text)) !== null) {
                                    // Добавляем текст до совпадения
                                    if (match.index > lastIndex) {
                                        parts.push({ text: text.substring(lastIndex, match.index), isHighlight: false });
                                    }
                                    // Добавляем совпавшее слово
                                    parts.push({ text: match[0], isHighlight: true });
                                    lastIndex = regex.lastIndex;
                                }
                                
                                // Добавляем оставшийся текст
                                if (lastIndex < text.length) {
                                    parts.push({ text: text.substring(lastIndex), isHighlight: false });
                                }
                                
                                return parts.map((item, i) => 
                                    item.isHighlight ? (
                                        <span key={i} style={{ color: '#ff6384' }}>{item.text}</span>
                                    ) : (
                                        <span key={i}>{item.text}</span>
                                    )
                                );
                            };
                            
                            return highlightWords(title);
                        })()}
                    </h2>
                    <div className="gpu-rental-why-items">
                        <div 
                            className="gpu-rental-why-item" 
                            ref={el => whyItemRefs.current[0] = el}
                        >
                            <h3 className="gpu-rental-why-item-title">{t('gpuRentalWhy1Title')}</h3>
                            <p className="gpu-rental-why-item-desc">{t('gpuRentalWhy1Desc')}</p>
                        </div>
                        <div 
                            className={`gpu-rental-why-divider-wrapper ${whyVisible ? 'visible' : ''}`}
                        >
                            <div className="gpu-rental-why-divider gpu-rental-why-divider-title"></div>
                            <div className="gpu-rental-why-divider gpu-rental-why-divider-desc"></div>
                        </div>
                        <div 
                            className="gpu-rental-why-item"
                            ref={el => whyItemRefs.current[1] = el}
                        >
                            <h3 className="gpu-rental-why-item-title">{t('gpuRentalWhy2Title')}</h3>
                            <p className="gpu-rental-why-item-desc">{t('gpuRentalWhy2Desc')}</p>
                        </div>
                        <div 
                            className={`gpu-rental-why-divider-wrapper ${whyVisible ? 'visible' : ''}`}
                        >
                            <div className="gpu-rental-why-divider gpu-rental-why-divider-title"></div>
                            <div className="gpu-rental-why-divider gpu-rental-why-divider-desc"></div>
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
                    <h2 className="gpu-rental-how-to-title">
                        {(() => {
                            const title = t('gpuRentalHowToTitle');
                            // Функция для покраски "GPU" и "server"
                            const highlightWords = (text) => {
                                const wordsToHighlight = ['GPU', 'server', 'сервер'];
                                const parts = [];
                                let lastIndex = 0;
                                
                                // Создаем регулярное выражение для поиска всех слов
                                const regex = new RegExp(`\\b(${wordsToHighlight.join('|')})\\b`, 'gi');
                                let match;
                                
                                while ((match = regex.exec(text)) !== null) {
                                    // Добавляем текст до совпадения
                                    if (match.index > lastIndex) {
                                        parts.push({ text: text.substring(lastIndex, match.index), isHighlight: false });
                                    }
                                    // Добавляем совпавшее слово
                                    parts.push({ text: match[0], isHighlight: true });
                                    lastIndex = regex.lastIndex;
                                }
                                
                                // Добавляем оставшийся текст
                                if (lastIndex < text.length) {
                                    parts.push({ text: text.substring(lastIndex), isHighlight: false });
                                }
                                
                                return parts.map((item, i) => 
                                    item.isHighlight ? (
                                        <span key={i} style={{ color: '#ff6384' }}>{item.text}</span>
                                    ) : (
                                        <span key={i}>{item.text}</span>
                                    )
                                );
                            };
                            
                            return highlightWords(title);
                        })()}
                    </h2>
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

