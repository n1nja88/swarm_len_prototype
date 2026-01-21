import { useParticles } from '../hooks/useParticles';

// Компонент для отображения фоновой анимации частиц
export function ParticleCanvas({ particleCount = 50, isLightTheme = false, className = '' }) {
    const canvasRef = useParticles(particleCount, isLightTheme);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.6,
                zIndex: 0
            }}
        />
    );
}

