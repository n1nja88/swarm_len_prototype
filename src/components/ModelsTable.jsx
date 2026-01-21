import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Компонент таблицы популярных моделей
export function ModelsTable() {
    const { t } = useLanguage();
    const [showMore, setShowMore] = useState(false);

    const models = [
        { name: 'GPT-4 Turbo', input: '$0.01', output: '$0.03' },
        { name: 'GPT-3.5 Turbo', input: '$0.0005', output: '$0.0015' },
        { name: 'Claude 3 Opus', input: '$0.015', output: '$0.075' },
        { name: 'Claude 3 Sonnet', input: '$0.003', output: '$0.015' },
        { name: 'Llama 3 70B', input: '$0.0007', output: '$0.0009', hidden: true },
        { name: 'Gemini Pro', input: '$0.0005', output: '$0.0015', hidden: true },
        { name: 'Mistral Large', input: '$0.002', output: '$0.006', hidden: true },
        { name: 'Claude 3 Haiku', input: '$0.00025', output: '$0.00125', hidden: true }
    ];

    const handleChat = (modelName) => {
        const currentLang = localStorage.getItem('language') || 'en';
        const message = currentLang === 'ru'
            ? `Открытие чата с моделью: ${modelName}`
            : `Opening chat with model: ${modelName}`;
        alert(message);
    };

    return (
        <section className="models-table">
            <div className="container">
                <h2 className="section-title">{t('popularModels')}</h2>
                <div className="models-container">
                    {models.map((model, index) => (
                        <div
                            key={index}
                            className={`model-row ${model.hidden && !showMore ? 'model-row-hidden' : ''} ${model.hidden && showMore ? 'show' : ''}`}
                        >
                            <div className="model-name">{model.name}</div>
                            <div className="model-pricing">
                                <span className="price-label">{t('input')}</span>
                                <span className="price-value">{model.input}</span>
                                <span className="price-unit">{t('tokens')}</span>
                            </div>
                            <div className="model-pricing">
                                <span className="price-label">{t('output')}</span>
                                <span className="price-value">{model.output}</span>
                                <span className="price-unit">{t('tokens')}</span>
                            </div>
                            <button className="chat-button" onClick={() => handleChat(model.name)}>
                                {t('chat')}
                            </button>
                        </div>
                    ))}
                    <div className="models-more-container">
                        <button
                            className={`more-button ${showMore ? 'expanded' : ''}`}
                            onClick={() => setShowMore(!showMore)}
                        >
                            <svg className="more-button-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}




