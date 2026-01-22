/**
 * Точка входа в приложение
 * Инициализирует React приложение и настраивает роутинг
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found');
}

try {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
} catch (error) {
    console.error('Error rendering app:', error);
    rootElement.innerHTML = `<div style="color: red; padding: 20px;">Error: ${error.message}</div>`;
}




