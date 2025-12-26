import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { Hero } from './components/Hero';
import { AboutSwarmind } from './components/AboutSwarmind';
import { MorePossibilities } from './components/MorePossibilities';
import { ModelsTable } from './components/ModelsTable';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import './styles.css';

// Главный компонент приложения
function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isLightTheme } = useTheme();

    const handleGetAccess = () => {
        setIsModalOpen(true);
    };

    const handleLogin = () => {
        const currentLang = localStorage.getItem('language') || 'en';
        const message = currentLang === 'ru'
            ? 'Переход на страницу входа'
            : 'Redirecting to login page';
        alert(message);
    };

    return (
        <div className="App">
            <Hero onGetAccess={handleGetAccess} onLogin={handleLogin} />
            <AboutSwarmind onGetAccess={handleGetAccess} />
            <MorePossibilities onGetAccess={handleGetAccess} />
            <ModelsTable />
            <Footer onGetAccess={handleGetAccess} />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default App;

