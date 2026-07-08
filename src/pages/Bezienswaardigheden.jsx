import { MapPin, Heart } from 'lucide-react';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import './ItemsPage.css';

//temporary data
const mockAttractions = [
    {
        id: 1,
        title: 'Brandenburger Tor',
        description: 'Het iconische symbool van Berlijn en de Duitse eenwording. Een van de bekendste herkenningspunten van Duitsland.',
        image: 'https://images.pexels.com/photos/2082104/pexels-photo-2082104.jpeg?auto=compress&cs=tinysrgb&w=600',
        location: 'Pariser Platz',
    },
    {
        id: 2,
        title: 'East Side Gallery',
        description: 'De langste openlucht galerie ter wereld op een stuk van de Berlijnse Muur met 105 kunstwerken.',
        image: 'https://images.pexels.com/photos/326289/pexels-photo-326289.jpeg?auto=compress&cs=tinysrgb&w=600',
        location: 'Mühlenstraße',
    },
    {
        id: 3,
        title: 'Holocaust Monument',
        description: 'Een indrukwekkend gedenkteken voor de Joodse slachtoffers van de Holocaust, met 2.711 betonnen stelae.',
        image: 'https://images.pexels.com/photos/183579/pexels-photo-183579.jpeg?auto=compress&cs=tinysrgb&w=600',
        location: 'Cora-Berliner-Straße',
    },
    {
        id: 4,
        title: 'Checkpoint Charlie',
        description: 'De beroemde grensovergang tussen Oost- en West-Berlijn tijdens de Koude Oorlog.',
        image: 'https://images.pexels.com/photos/269872/pexels-photo-269872.jpeg?auto=compress&cs=tinysrgb&w=600',
        location: 'Friedrichstraße',
    },
    {
        id: 5,
        title: 'Berliner Dom',
        description: 'De prachtige domkerk van Berlijn met indrukwekkende architectuur en een fantastisch uitzicht.',
        image: 'https://images.pexels.com/photos/1121783/pexels-photo-1121783.jpeg?auto=compress&cs=tinysrgb&w=600',
        location: 'Museum Island',
    },
    {
        id: 6,
        title: 'Potsdam',
        description: 'Excursie naar het prachtige Paleis Sanssouci en de historische tuinen.',
        image: 'https://images.pexels.com/photos/2609418/pexels-photo-2609418.jpeg?auto=compress&cs=tinysrgb&w=600',
        location: 'Potsdam',
    },
];

export default function Bezienswaardigheden() {
    const filteredAttractions = mockAttractions;
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
                    value=""
                    onChange={() => { }}
                    placeholder="Zoek bezienswaardigheden..."
                />

                <button className="filter-toggle" disabled>
                    <Heart size={18} />
                    <span>Favorieten</span>
                </button>
            </div>

            <div className="items-info">
                <p>{filteredAttractions.length} bezienswaardig{filteredAttractions.length !== 1 ? 'heden' : 'd'} gevonden</p>
            </div>


            <div className="grid">
                {filteredAttractions.map((item) => (
                    <Card
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        subtitle={item.location}
                    />
                ))}
            </div>
        </div>
    );
}
