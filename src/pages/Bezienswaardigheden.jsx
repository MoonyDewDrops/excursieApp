import { useState, useMemo, useEffect } from 'react';
import { MapPin, Filter, Heart } from 'lucide-react';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { useApp } from '../contexts/AppContext';
import './ItemsPage.css';

export default function Bezienswaardigheden() {
    const [attractions, setAttractions] = useState([]);
    const [search, setSearch] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const { toggleFavorite, isFavorite } = useApp();
    
    useEffect(() => {
    async function fetchAttractions() {
        try {
            const response = await fetch(
                "https://excursieapp-production.up.railway.app//api/bezienswaardigheden"
            );

            const data = await response.json();

            console.log(data);

            setAttractions(data);

        } catch (error) {
            console.error(
                "Fout bij ophalen bezienswaardigheden:",
                error
            );
        }
    }

    fetchAttractions();

}, []);

    const filteredAttractions = useMemo(() => {
        let results = attractions;

        if (showFavoritesOnly) {
            results = results.filter(item => isFavorite(item.id, 'attraction'));
        }

        if (search.trim()) {
            const searchLower = search.toLowerCase();
            results = results.filter(item =>
                item.title.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower) ||
                item.location.toLowerCase().includes(searchLower)
            );
        }

        return results;
    }, [search, showFavoritesOnly, isFavorite, attractions]);

    return (
        <div className="items-page">
            <header className="page-header">
                <div className="page-header-content">
                    <h1 className="page-title">
                        <MapPin size={28} />
                        Bezienswaardigheden
                    </h1>
                    <p className="page-description">
                        Ontdek de mooiste plekken van Berlijn
                    </p>
                </div>
            </header>

            <div className="filters">
                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Zoek bezienswaardigheden..."
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
                <p>{filteredAttractions.length} bezienswaardig{filteredAttractions.length !== 1 ? 'heden' : 'd'} gevonden</p>
            </div>

            {filteredAttractions.length === 0 ? (
                <div className="empty-state">
                    <Filter size={48} />
                    <h3>Geen resultaten</h3>
                    <p>
                        {showFavoritesOnly
                            ? 'Je hebt nog geen favorieten toegevoegd.'
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
                    {filteredAttractions.map((item) => (
                        <Card
                            key={item.id}
                            id={item.id}
                            type="attraction"
                            title={item.title}
                            description={item.description}
                            image={item.image}
                            subtitle={item.location}
                            isFavorite={isFavorite(item.id, 'attraction')}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
