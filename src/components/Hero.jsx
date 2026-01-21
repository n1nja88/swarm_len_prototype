import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Компонент Hero секции
export function Hero({ onGetAccess, onLogin }) {
    const { t } = useLanguage();
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const heroRef = useRef(null);
    const animationFrameRef = useRef(null);
    const targetPositionRef = useRef({ x: 50, y: 50 });

    useEffect(() => {
        const updatePosition = () => {
            setMousePosition(prev => {
                const dx = targetPositionRef.current.x - prev.x;
                const dy = targetPositionRef.current.y - prev.y;
                
                // Плавная интерполяция
                if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
                    return targetPositionRef.current;
                }
                
                return {
                    x: prev.x + dx * 0.15,
                    y: prev.y + dy * 0.15
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
                
                const maxOffset = Math.min(rect.width, rect.height) * 0.5;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                let limitedDeltaX = deltaX;
                let limitedDeltaY = deltaY;
                
                if (distance > maxOffset) {
                    const ratio = maxOffset / distance;
                    limitedDeltaX = deltaX * ratio;
                    limitedDeltaY = deltaY * ratio;
                }
                
                const offsetX = limitedDeltaX * 0.5;
                const offsetY = limitedDeltaY * 0.5;
                
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

    // Вычисляем смещение от центра (50%)
    const offsetX = mousePosition.x - 50;
    const offsetY = mousePosition.y - 50;
    
    // Радиусы кругов в процентах (приблизительно)
    // circle-1: 150px, circle-2: 500px
    // При ширине экрана ~1400px: circle-1 ~10.7%, circle-2 ~35.7%
    const circle1Radius = 10.7;
    const circle2Radius = 35.7;
    
    // Ограничиваем позицию circle-1, чтобы он не выходил за границы circle-2
    const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    const maxDistance = circle2Radius - circle1Radius - 1; // -1 для небольшого отступа
    
    let limitedOffsetX = offsetX;
    let limitedOffsetY = offsetY;
    
    if (distance > maxDistance) {
        const ratio = maxDistance / distance;
        limitedOffsetX = offsetX * ratio;
        limitedOffsetY = offsetY * ratio;
    }
    
    // Вычисляем растяжение для каждого круга (увеличено)
    const getStretch = (index) => {
        const stretchDistance = Math.sqrt(limitedOffsetX * limitedOffsetX + limitedOffsetY * limitedOffsetY);
        return Math.min(stretchDistance / 20 * (1 + index * 0.3), 2);
    };

    return (
        <section className="hero" ref={heroRef}>
            <div className="hero-background">
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
            <div className="hero-content">
                <div className="hero-text">
                    <h1>{t('heroTitle')}</h1>
                    <h2>{t('heroSubtitle')}</h2>
                    <div className="hero-buttons">
                        <button className="cta-button" onClick={onGetAccess}>
                            {t('getAccess')}
                        </button>
                        <button className="login-button" onClick={onLogin}>
                            {t('login')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

