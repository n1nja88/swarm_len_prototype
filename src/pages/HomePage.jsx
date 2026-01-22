/**
 * Главная страница приложения
 * Содержит Hero секцию, информацию о Swarmind, возможности платформы и таблицу моделей
 */
import { Hero } from '../components/Hero';
import { AboutSwarmind } from '../components/AboutSwarmind';
import { MorePossibilities } from '../components/MorePossibilities';
import { ModelsTable } from '../components/ModelsTable';

export function HomePage({ onGetAccess, onLogin }) {
    return (
        <>
            <Hero onGetAccess={onGetAccess} onLogin={onLogin} />
            <AboutSwarmind onGetAccess={onGetAccess} />
            <MorePossibilities onGetAccess={onGetAccess} />
            <ModelsTable />
        </>
    );
}

