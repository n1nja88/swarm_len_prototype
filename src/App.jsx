import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { Hero } from './components/Hero';
import { AboutSwarmind } from './components/AboutSwarmind';
import { MorePossibilities } from './components/MorePossibilities';
import { ModelsTable } from './components/ModelsTable';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { LoginModal } from './components/LoginModal';
import './styles.css';

// Главный компонент приложения
function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { isLightTheme } = useTheme();

    const handleGetAccess = () => {
        setIsModalOpen(true);
    };

    const handleLogin = () => {
        setIsLoginModalOpen(true);
    };

    return (
        <div className="App">
            <Hero onGetAccess={handleGetAccess} onLogin={handleLogin} />
            <AboutSwarmind onGetAccess={handleGetAccess} />
            <MorePossibilities onGetAccess={handleGetAccess} />
            <ModelsTable />
            <Footer onGetAccess={handleGetAccess} />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </div>
    );
}

export default App;

