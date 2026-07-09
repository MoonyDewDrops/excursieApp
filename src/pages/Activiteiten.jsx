import { useState, useMemo } from 'react';
import { Calendar, Filter, Heart } from 'lucide-react';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { useApp } from '../contexts/AppContext';
import './ItemsPage.css';

// Mock data - will be replaced by user's database
const mockActivities = [
    {
        id: 1,
        title: 'Computerspelmuseum',
        description: `Ontdek de geschiedenis van videogames. Van klassieke arcadespelletjes tot moderne virtual reality experiences.`,
        image: 'https://images.pexels.com/photos/271009/pexels-photo-271009.jpeg?auto=compress&cs=tinysrgb&w=600',
        time: 'Ochtendprogramma',
    },
    {
        id: 2,
        title: 'Berlin Story Bunker',
        description: 'Een indrukwekkend historisch museum onder de grond. Leer alles over de Tweede Wereldoorlog.',
        image: 'https://images.pexels.com/photos/2609418/pexels-photo-2609418.jpeg?auto=compress&cs=tinysrgb&w=600',
        time: 'Middagprogramma',
    },
    {
        id: 3,
        title: 'Hackescher Markt',
        description: 'Verken de levendige wijk met boetiekjes, restaurants en de beroemde Hackesche Höfe.',
        image: 'https://images.pexels.com/photos/269872/pexels-photo-269872.jpeg?auto=compress&cs=tinysrgb&w=600',
        time: 'Vrije tijd',
    },
    {
        id: 4,
        title: 'Museum Island Tour',
        description: 'Bezoek de vijf wereldberoemde musea op het UNESCO Werelderfgoed Museumsinsel.',
        image: 'https://images.pexels.com/photos/1121783/pexels-photo-1121783.jpeg?auto=compress&cs=tinysrgb&w=600',
        time: 'Optioneel',
    },
    {
        id: 5,
        title: 'Street Art Walking Tour',
        description: 'Ontdek de beste street art en graffiti in de alternatieve wijken van Berlijn.',
        image: 'https://images.pexels.com/photos/326289/pexels-photo-326289.jpeg?auto=compress&cs=tinysrgb&w=600',
        time: 'Optioneel',
    },
];

export default function Activiteiten() {
    const [search, setSearch] = useState('');
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const { toggleFavorite, isFavorite } = useApp();

    const filteredActivities = useMemo(() => {
        let results = mockActivities;

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
    }, [search, showFavoritesOnly, isFavorite]);

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
