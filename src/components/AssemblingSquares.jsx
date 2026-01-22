import { useState, useEffect, useRef } from 'react';

export function AssemblingSquares() {
    const [squares, setSquares] = useState([]);
    const [animationPhase, setAnimationPhase] = useState(0); // 0: scattered, 1: assembling, 2: assembled, 3: dispersing
    const [cycleCount, setCycleCount] = useState(0);
    const animationFrameRef = useRef(null);
    const containerRef = useRef(null);
    
    const totalSquares = 30;
    const maxCycles = Infinity; // Бесконечное повторение
    const centerX = 750; // Правая часть экрана
    const centerY = 800; // Центр на уровне текста главного экрана (еще ниже)
    const secondScreenCenterY = 1800; // Центр второго экрана (для распада)
    
    // Паттерны сборки (в правой части экрана)
    const patterns = [
        // Паттерн 1: Большой квадрат 5x6
        {
            positions: Array.from({ length: 30 }, (_, i) => {
                const row = Math.floor(i / 5);
                const col = i % 5;
                return {
                    x: centerX + (col - 2) * 55,
                    y: centerY + (row - 2.5) * 55,
                    rotation: 0
                };
            })
        },
        // Паттерн 2: Крест
        {
            positions: Array.from({ length: totalSquares }, (_, i) => {
                if (i < 5) {
                    // Вертикальная линия
                    return { x: centerX, y: centerY - 120 + i * 60, rotation: 0 };
                } else if (i < 10) {
                    // Горизонтальная линия
                    return { x: centerX - 180 + (i - 5) * 60, y: centerY, rotation: 0 };
                } else if (i < 15) {
                    // Диагональ 1
                    return { x: centerX - 150 + (i - 10) * 50, y: centerY - 150 + (i - 10) * 50, rotation: 45 };
                } else {
                    // Диагональ 2
                    return { x: centerX + 150 - (i - 15) * 50, y: centerY - 150 + (i - 15) * 50, rotation: -45 };
                }
            })
        },
        // Паттерн 3: Звезда/ромб
        {
            positions: Array.from({ length: totalSquares }, (_, i) => {
                const angle = (i / totalSquares) * Math.PI * 2;
                const radius = 150;
                return {
                    x: centerX + Math.cos(angle) * radius,
                    y: centerY + Math.sin(angle) * radius,
                    rotation: (angle * 180) / Math.PI
                };
            })
        },
        // Паттерн 4: Два квадрата
        {
            positions: Array.from({ length: totalSquares }, (_, i) => {
                if (i < 10) {
                    const row = Math.floor(i / 3);
                    const col = i % 3;
                    return {
                        x: centerX - 200 + col * 50,
                        y: centerY - 50 + row * 50,
                        rotation: 0
                    };
                } else {
                    const row = Math.floor((i - 10) / 3);
                    const col = (i - 10) % 3;
                    return {
                        x: centerX + 50 + col * 50,
                        y: centerY + 50 + row * 50,
                        rotation: 45
                    };
                }
            })
        },
        // Паттерн 5: Спираль
        {
            positions: Array.from({ length: totalSquares }, (_, i) => {
                const angle = i * 0.5;
                const radius = 50 + i * 15;
                return {
                    x: centerX + Math.cos(angle) * radius,
                    y: centerY + Math.sin(angle) * radius,
                    rotation: angle * 180 / Math.PI
                };
            })
        }
    ];
    
    // Инициализация квадратов в разбросанном состоянии
    useEffect(() => {
        const initialSquares = Array.from({ length: totalSquares }, (_, i) => {
            const angle = (i / totalSquares) * Math.PI * 2;
            // Ограничиваем радиус для первого экрана
            const maxRadiusX = Math.min(centerX - 100, 900 - centerX);
            const maxRadiusY = Math.min(centerY - 100, 900 - centerY);
            const maxRadius = Math.min(maxRadiusX, maxRadiusY) * 0.5;
            const radius = Math.min(30, maxRadius);
            let x = centerX + Math.cos(angle) * radius;
            let y = centerY + Math.sin(angle) * radius;
            // Ограничиваем координаты
            x = Math.max(100, Math.min(900, x));
            y = Math.max(100, Math.min(900, y));
            return {
                id: i,
                x: x,
                y: y,
                targetX: x,
                targetY: y,
                rotation: Math.random() * 360,
                targetRotation: Math.random() * 360,
                size: 40 + Math.random() * 20
            };
        });
        setSquares(initialSquares);
    }, []);
    
    // Анимация переходов
    useEffect(() => {
        if (squares.length === 0) return;
        
        const animate = () => {
            setSquares(prevSquares => {
                return prevSquares.map(square => {
                    const dx = square.targetX - square.x;
                    const dy = square.targetY - square.y;
                    const dRot = square.targetRotation - square.rotation;
                    
                    // Замедленная анимация (в 3 раза медленнее)
                    const speed = animationPhase === 1 ? 0.05 : animationPhase === 3 ? 0.04 : 0.027;
                    const rotSpeed = animationPhase === 3 ? 0.05 : 0.06;
                    
                    let newX = Math.abs(dx) < 0.1 ? square.targetX : square.x + dx * speed;
                    let newY = Math.abs(dy) < 0.1 ? square.targetY : square.y + dy * speed;
                    const newRot = Math.abs(dRot) < 0.1 ? square.targetRotation : square.rotation + dRot * rotSpeed;
                    
                    // ЖЕСТКО ограничиваем координаты во время анимации
                    newX = Math.max(50, Math.min(950, newX));
                    // Определяем, на каком экране квадрат должен быть (по целевой позиции)
                    if (square.targetY < 1000) {
                        // Первый экран: Y 50-950
                        newY = Math.max(50, Math.min(950, newY));
                    } else {
                        // Второй экран: Y 1050-1950
                        newY = Math.max(1050, Math.min(1950, newY));
                    }
                    
                    return {
                        ...square,
                        x: newX,
                        y: newY,
                        rotation: newRot
                    };
                });
            });
            
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        
        animationFrameRef.current = requestAnimationFrame(animate);
        
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [squares.length, animationPhase]);
    
    // Управление фазами анимации через простые таймеры
    useEffect(() => {
        if (squares.length === 0) return;
        if (maxCycles !== Infinity && cycleCount >= maxCycles) return;
        
        let timeouts = [];
        
        const scheduleCycle = (cycle) => {
            if (maxCycles !== Infinity && cycle >= maxCycles) return;
            
            // Фаза 0 -> 1: Начинаем сборку (через 0.3 сек после разброса)
            const t1 = setTimeout(() => {
                setAnimationPhase(1);
                const pattern = patterns[cycle % patterns.length];
                setSquares(prev => prev.map((sq, i) => ({
                    ...sq,
                    targetX: pattern.positions[i].x,
                    targetY: pattern.positions[i].y,
                    targetRotation: pattern.positions[i].rotation || 0
                })));
                
                // Фаза 1 -> 2: Собрались (через 1 сек)
                const t2 = setTimeout(() => {
                    setAnimationPhase(2);
                    
                    // Фаза 2 -> 3: Держим форму 4.5 сек, затем распадаемся
                    const t3 = setTimeout(() => {
                        setAnimationPhase(3);
                        // Распределяем квадраты равномерно по всей площади обоих экранов
                        // viewBox: 0 0 1000 2000
                        // Первый экран: Y 0-1000, второй экран: Y 1000-2000
                        setSquares(prev => prev.map((sq, i) => {
                            // Равномерное распределение по сетке на обоих экранах
                            // X: 50-950 (с отступами), Y: равномерно по обоим экранам
                            
                            // Определяем, на каком экране будет квадрат
                            const isFirstScreen = i < totalSquares / 2;
                            
                            // Создаем сетку для равномерного распределения
                            const squaresPerScreen = Math.ceil(totalSquares / 2);
                            const indexInScreen = isFirstScreen ? i : i - squaresPerScreen;
                            
                            // Вычисляем размеры сетки (примерно квадратная)
                            const cols = Math.ceil(Math.sqrt(squaresPerScreen));
                            const rows = Math.ceil(squaresPerScreen / cols);
                            
                            const col = indexInScreen % cols;
                            const row = Math.floor(indexInScreen / cols);
                            
                            // Распределяем по площади экрана с небольшими случайными смещениями
                            const screenWidth = 900; // 950 - 50
                            const screenHeight = 950; // 1000 - 50 для первого, 2000 - 1050 для второго
                            
                            const cellWidth = screenWidth / cols;
                            const cellHeight = screenHeight / rows;
                            
                            // Центр ячейки + небольшое случайное смещение
                            const offsetX = (Math.random() - 0.5) * cellWidth * 0.6;
                            const offsetY = (Math.random() - 0.5) * cellHeight * 0.6;
                            
                            let targetX = 50 + col * cellWidth + cellWidth / 2 + offsetX;
                            let targetY;
                            
                            if (isFirstScreen) {
                                // Первый экран: Y 50-950
                                targetY = 50 + row * cellHeight + cellHeight / 2 + offsetY;
                            } else {
                                // Второй экран: Y 1050-1950
                                targetY = 1050 + row * cellHeight + cellHeight / 2 + offsetY;
                            }
                            
                            // ЖЕСТКО ограничиваем координаты
                            targetX = Math.max(50, Math.min(950, targetX));
                            
                            if (isFirstScreen) {
                                // Первый экран: строго 50-950
                                targetY = Math.max(50, Math.min(950, targetY));
                            } else {
                                // Второй экран: строго 1050-1950
                                targetY = Math.max(1050, Math.min(1950, targetY));
                            }
                            
                            return {
                                ...sq,
                                targetX: targetX,
                                targetY: targetY,
                                targetRotation: Math.random() * 360
                            };
                        }));
                        
                        // Фаза 3 -> 0: Распались (через 1 сек), начинаем новый цикл
                        const t4 = setTimeout(() => {
                            setAnimationPhase(0);
                            setCycleCount(cycle + 1);
                            scheduleCycle(cycle + 1);
                        }, 1000);
                        timeouts.push(t4);
                    }, 4500);
                    timeouts.push(t3);
                }, 1000);
                timeouts.push(t2);
            }, 300);
            timeouts.push(t1);
        };
        
        scheduleCycle(cycleCount);
        
        return () => {
            timeouts.forEach(t => clearTimeout(t));
        };
    }, [cycleCount, squares.length]);
    
    return (
        <div className="geometric-background geometric-assembling-squares" ref={containerRef}>
            <svg className="assembling-squares-svg" viewBox="0 0 1000 2000" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="assembleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(93, 99, 255, 0.5)" />
                        <stop offset="100%" stopColor="rgba(138, 43, 226, 0.4)" />
                    </linearGradient>
                    <linearGradient id="assembleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(138, 43, 226, 0.45)" />
                        <stop offset="100%" stopColor="rgba(75, 192, 192, 0.35)" />
                    </linearGradient>
                    <linearGradient id="assembleGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(75, 192, 192, 0.4)" />
                        <stop offset="100%" stopColor="rgba(255, 99, 132, 0.3)" />
                    </linearGradient>
                    <filter id="assembleGlow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                {squares.map((square, i) => (
                    <g
                        key={square.id}
                        transform={`translate(${square.x}, ${square.y}) rotate(${square.rotation})`}
                    >
                        <rect
                            x={-square.size / 2}
                            y={-square.size / 2}
                            width={square.size}
                            height={square.size}
                            fill="none"
                            stroke={`url(#assembleGradient${(i % 3) + 1})`}
                            strokeWidth="1.5"
                            filter="url(#assembleGlow)"
                            opacity="0.7"
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}

