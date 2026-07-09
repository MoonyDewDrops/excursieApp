import { useState, useMemo, useEffect } from 'react';
import { Calendar, Filter, Heart } from 'lucide-react';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { useApp } from '../contexts/AppContext';
import './ItemsPage.css';


export default function Activiteiten() {
    const [activities, setActivities] = useState([]);
    const [search, setSearch] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const { toggleFavorite, isFavorite } = useApp();

    useEffect(() => {
        async function fetchActivities() {
            try {
                const response = await fetch(
                    "https://excursieapp-production.up.railway.app//api/activiteiten"
                );

                const data = await response.json();

                setActivities(data);
            } catch (error) {
                console.error(
                    "Fout bij ophalen activiteiten:",
                    error
                );
            }
        }

        fetchActivities();
    }, []);

    const filteredActivities = useMemo(() => {
        let results = activities;

        if (showFavoritesOnly) {
            results = results.filter(item => isFavorite(item.id, 'activity'));
        }

        if (search.trim()) {
            const searchLower = search.toLowerCase();
            results = results.filter(item =>
                item.title.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower) ||
                item.time.toLowerCase().includes(searchLower)
            );
        }

        return results;
    }, [search, showFavoritesOnly, isFavorite, activities]);

    return (
        <div className="items-page">
            <header className="page-header">
                <div className="page-header-content">
                    <h1 className="page-title">
                        <Calendar size={28} />
                        Activiteiten
                    </h1>
                    <p className="page-description">
                        Geplande activiteiten en tips voor je verblijf
                    </p>
                </div>
            </header>

            <div className="filters">
                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Zoek activiteiten..."
                />
                <button
                    className={`filter-toggle ${showFavoritesOnly ? 'active' : ''}`}
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                >
                    <Heart size={18} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
                    <span>Favorieten</span>
                </button>
            </div>

            <div className="items-info">
                <p>{filteredActivities.length} activiteit{filteredActivities.length !== 1 ? 'en' : ''} gevonden</p>
            </div>

            {filteredActivities.length === 0 ? (
                <div className="empty-state">
                    <Filter size={48} />
                    <h3>Geen resultaten</h3>
                    <p>
                        {showFavoritesOnly
                            ? 'Je hebt nog geen favoriete activiteiten.'
                            : 'Probeer een andere zoekterm.'}
                    </p>
                    {showFavoritesOnly && (
                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowFavoritesOnly(false)}
                        >
                            Toon alles
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid">
                    {filteredActivities.map((item) => (
                        <Card
                            key={item.id}
                            id={item.id}
                            type="activity"
                            title={item.title}
                            description={item.description}
                            image={item.image}
                            subtitle={item.time}
                            isFavorite={isFavorite(item.id, 'activity')}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
