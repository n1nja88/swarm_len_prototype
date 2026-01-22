import { useState, useEffect, useRef } from 'react';

export function GeometricBackground({ type = 'hexagons' }) {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const containerRef = useRef(null);
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
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
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
                
                targetPositionRef.current = {
                    x: 50 + (offsetX / rect.width) * 100,
                    y: 50 + (offsetY / rect.height) * 100
                };
            }
        };

        const handleMouseLeave = () => {
            targetPositionRef.current = { x: 50, y: 50 };
        };

        const containerElement = containerRef.current;
        if (containerElement) {
            animationFrameRef.current = requestAnimationFrame(updatePosition);
            containerElement.addEventListener('mousemove', handleMouseMove, { passive: true });
            containerElement.addEventListener('mouseleave', handleMouseLeave);
            
            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
                containerElement.removeEventListener('mousemove', handleMouseMove);
                containerElement.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    const offsetX = mousePosition.x - 50;
    const offsetY = mousePosition.y - 50;
    
    const getStretch = (index) => {
        const stretchDistance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        return Math.min(stretchDistance / 40 * (1 + index * 0.15), 1.3);
    };

    if (type === 'hexagons') {
        // Для UnifiedAPI - сетка шестиугольников
        return (
            <div className="geometric-background geometric-hexagons" ref={containerRef}>
                <svg className="hexagon-grid" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <linearGradient id="hexGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(93, 99, 255, 0.4)" />
                            <stop offset="100%" stopColor="rgba(138, 43, 226, 0.3)" />
                        </linearGradient>
                        <linearGradient id="hexGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(138, 43, 226, 0.35)" />
                            <stop offset="100%" stopColor="rgba(75, 192, 192, 0.25)" />
                        </linearGradient>
                        <linearGradient id="hexGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(75, 192, 192, 0.3)" />
                            <stop offset="100%" stopColor="rgba(255, 99, 132, 0.2)" />
                        </linearGradient>
                        <filter id="hexGlow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    {[...Array(15)].map((_, i) => {
                        const row = Math.floor(i / 5);
                        const col = i % 5;
                        const x = 200 + col * 200;
                        const y = 200 + row * 200;
                        const size = 60 + (i % 3) * 20;
                        const angle = (i * 30) % 360;
                        const stretch = getStretch(i % 3 + 1);
                        const transformX = x + offsetX * 2;
                        const transformY = y + offsetY * 2;
                        
                        return (
                            <g key={i} transform={`translate(${transformX}, ${transformY}) rotate(${angle}) scale(${1 + stretch * 0.1})`}>
                                <polygon
                                    points={`${size},${size * 0.5} ${size * 0.5},${size * 0.866} ${-size * 0.5},${size * 0.866} ${-size},${size * 0.5} ${-size * 0.5},${-size * 0.866} ${size * 0.5},${-size * 0.866}`}
                                    fill="none"
                                    stroke={`url(#hexGradient${(i % 3) + 1})`}
                                    strokeWidth="1.5"
                                    filter="url(#hexGlow)"
                                    opacity="0.6"
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>
        );
    }

    if (type === 'triangles') {
        // Для GPURental - треугольники
        return (
            <div className="geometric-background geometric-triangles" ref={containerRef}>
                <svg className="triangle-grid" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
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
                        const row = Math.floor(i / 4);
                        const col = i % 4;
                        const x = 150 + col * 250;
                        const y = 150 + row * 300;
                        const size = 80 + (i % 3) * 30;
                        const rotation = (i * 45) % 360;
                        const stretch = getStretch(i % 3 + 1);
                        const transformX = x + offsetX * 2;
                        const transformY = y + offsetY * 2;
                        
                        return (
                            <g key={i} transform={`translate(${transformX}, ${transformY}) rotate(${rotation}) scale(${1 + stretch * 0.1})`}>
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
        );
    }

    if (type === 'squares') {
        // Для FreeInfrastructure - квадраты/ромбы
        return (
            <div className="geometric-background geometric-squares" ref={containerRef}>
                <svg className="square-grid" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <linearGradient id="sqGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(93, 99, 255, 0.45)" />
                            <stop offset="100%" stopColor="rgba(138, 43, 226, 0.35)" />
                        </linearGradient>
                        <linearGradient id="sqGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(138, 43, 226, 0.4)" />
                            <stop offset="100%" stopColor="rgba(75, 192, 192, 0.3)" />
                        </linearGradient>
                        <linearGradient id="sqGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(75, 192, 192, 0.35)" />
                            <stop offset="100%" stopColor="rgba(255, 99, 132, 0.25)" />
                        </linearGradient>
                        <filter id="sqGlow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    {[...Array(16)].map((_, i) => {
                        const row = Math.floor(i / 4);
                        const col = i % 4;
                        const x = 150 + col * 220;
                        const y = 150 + row * 220;
                        const size = 70 + (i % 3) * 25;
                        const rotation = (i * 22.5) % 360;
                        const stretch = getStretch(i % 3 + 1);
                        const transformX = x + offsetX * 2;
                        const transformY = y + offsetY * 2;
                        
                        return (
                            <g key={i} transform={`translate(${transformX}, ${transformY}) rotate(${rotation}) scale(${1 + stretch * 0.1})`}>
                                <rect
                                    x={-size}
                                    y={-size}
                                    width={size * 2}
                                    height={size * 2}
                                    fill="none"
                                    stroke={`url(#sqGradient${(i % 3) + 1})`}
                                    strokeWidth="1.5"
                                    filter="url(#sqGlow)"
                                    opacity="0.6"
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>
        );
    }

    return null;
}

