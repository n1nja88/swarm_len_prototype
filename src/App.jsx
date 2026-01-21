import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { UnifiedAPI } from './pages/UnifiedAPI';
import { GPURental } from './pages/GPURental';
import { FreeInfrastructure } from './pages/FreeInfrastructure';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { LoginModal } from './components/LoginModal';
import './styles.css';

// Главный компонент приложения
function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleGetAccess = () => {
        setIsModalOpen(true);
    };

    const handleLogin = () => {
        setIsLoginModalOpen(true);
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage onGetAccess={handleGetAccess} onLogin={handleLogin} />} />
                <Route path="/unified-api" element={<UnifiedAPI />} />
                <Route path="/gpu-rental" element={<GPURental />} />
                <Route path="/free-infrastructure" element={<FreeInfrastructure />} />
            </Routes>
            <Footer onGetAccess={handleGetAccess} />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </div>
    );
}

export default App;

