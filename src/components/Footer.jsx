import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../hooks/useTheme';

// Компонент футера
export function Footer({ onGetAccess }) {
    const { t, language, toggleLanguage } = useLanguage();
    const { isLightTheme, toggleTheme } = useTheme();
    const location = useLocation();

    // Определяем класс страницы для футера
    let footerClass = "prelaunch";
    if (location.pathname === "/unified-api") {
        footerClass += " page-unified-api-footer";
    } else if (location.pathname === "/gpu-rental") {
        footerClass += " page-gpu-rental-footer";
    } else if (location.pathname === "/free-infrastructure") {
        footerClass += " page-free-infrastructure-footer";
    }

    return (
        <section className={footerClass}>
            <div className="footer-background-text">
                <span className="footer-letter-1">S</span>
                <span className="footer-letter-2">W</span>
                <span className="footer-letter-3">A</span>
                <span className="footer-letter-4">R</span>
                <span className="footer-letter-5">M</span>
            </div>
            <div className="container">
                <div className="prelaunch-content">
                    <div className="prelaunch-left">
                        <nav className="footer-navigation">
                            <Link to="/" className="footer-nav-link">{t('homeNav')}</Link>
                            <Link to="/unified-api" className="footer-nav-link">{t('unifiedAPINav')}</Link>
                            <Link to="/gpu-rental" className="footer-nav-link">{t('gpuRentalNav')}</Link>
                            <Link to="/free-infrastructure" className="footer-nav-link">{t('freeInfrastructureNav')}</Link>
                        </nav>
                    </div>
                    <div className="prelaunch-center">
                        <div className="footer-controls">
                            <div className="language-toggle-container">
                                <label className="language-toggle">
                                    <input
                                        type="checkbox"
                                        checked={language === 'ru'}
                                        onChange={toggleLanguage}
                                    />
                                    <span className="language-toggle-slider"></span>
                                    <span className="language-toggle-label">
                                        {language.toUpperCase()}
                                    </span>
                                </label>
                            </div>
                            <div className="theme-toggle-container">
                                <label className="theme-toggle">
                                    <input
                                        type="checkbox"
                                        checked={isLightTheme}
                                        onChange={toggleTheme}
                                    />
                                    <span className="theme-toggle-slider"></span>
                                    <span className="theme-toggle-label">{t('lightMode')}</span>
                                </label>
                            </div>
                        </div>
                        <p className="team-description">{t('footerDescription')}</p>
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <svg className="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221c-.15 1.58-.84 5.61-1.188 7.43-.174.93-.516 1.24-1.048 1.24-.896.01-1.57-.59-2.434-1.08-1.35-.69-2.11-1.12-3.42-1.79-1.52-.85-.535-1.32.33-2.08.227-.2 4.006-3.68 4.084-3.99.01-.03.01-.15-.056-.22-.066-.07-.18-.09-.264-.05-.09.04-1.52.95-4.29 2.79-.406.27-.774.4-1.104.4-.364-.01-1.064-.2-1.584-.37-.64-.2-1.15-.31-1.11-.66.023-.18.32-.36.89-.55 3.47-1.52 5.78-2.52 6.93-3.01 3.33-1.4 4.02-1.64 4.47-1.66.1 0 .32.02.46.15.12.1.16.24.18.34-.01.06.01.24 0 .37z" fill="currentColor"/>
                                </svg>
                            </a>
                            <a href="#" className="social-link">
                                <svg className="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="currentColor"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="prelaunch-right">
                        <div className="prelaunch-cta">
                            <button className="cta-button" onClick={onGetAccess}>
                                {t('getAccess')}
                            </button>
                        </div>
                        <div className="footer-documents">
                            <a href="#" className="footer-link">{t('dataPolicy')}</a>
                            <span className="footer-separator">|</span>
                            <a href="#" className="footer-link">{t('userAgreement')}</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

