import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Star } from 'lucide-react';
import WeatherWidget from '../components/WeatherWidget';
import Card from '../components/Card';
import './Home.css';

//temporary data
const featuredAttractions = [
  {
    id: 1,
    title: 'Brandenburger Tor',
    description: 'Het iconische symbool van Berlijn en de Duitse eenwording.',
    image: 'https://images.pexels.com/photos/2082104/pexels-photo-2082104.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    title: 'East Side Gallery',
    description: 'De langste openlucht galerie ter wereld op een stuk van de Berlijnse Muur.',
    image: 'https://images.pexels.com/photos/326289/pexels-photo-326289.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

//temporary data
const featuredActivities = [
  {
    id: 1,
    title: 'Computerspelmuseum',
    description: 'Ontdek de geschiedenis van videogames in dit unieke museum.',
    image: 'https://images.pexels.com/photos/271009/pexels-photo-271009.jpeg?auto=compress&cs=tinysrgb&w=600',
    subtitle: 'Ochtendprogramma',
  },
  {
    id: 2,
    title: 'Berlin Story Bunker',
    description: 'Een indrukwekkend historisch museum onder de grond.',
    image: 'https://images.pexels.com/photos/269872/pexels-photo-269872.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

// temporary mock weather data for the widget, will have to find a way to fetch real-time weather data from an API or something
const mockWeather = {
  temp: 18,
  condition: 'cloudy',
  humidity: 65,
  wind: 12,
};

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Ontdek
            <span className="hero-title-accent"> Berlijn</span>
          </h1>
          <p className="hero-description">
            Je complete gids voor de excursie naar de fascinerende Duitse hoofdstad.
            Bezienswaardigheden, activiteiten en alle praktische info op een plek.
          </p>
          <div className="hero-actions">
            <Link to="/bezienswaardigheden" className="btn btn-primary">
              <MapPin size={18} />
              Bezienswaardigheden
            </Link>
            <Link to="/activiteiten" className="btn btn-secondary">
              <Calendar size={18} />
              Activiteiten
            </Link>
          </div>
        </div>
        <div className="hero-weather">
          <WeatherWidget weather={mockWeather} />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="stats">
        <div className="stat-card">
          <span className="stat-number">5+</span>
          <span className="stat-label">Bezienswaardigheden</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">5+</span>
          <span className="stat-label">Activiteiten</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">4</span>
          <span className="stat-label">Dagen</span>
        </div>
        <div className="stat-card">
          <span className="stat-number"><Star size={24} /></span>
          <span className="stat-label">Maak favorieten</span>
        </div>
      </section>

      {/* Featured Attractions */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            <MapPin size={24} />
            Top Bezienswaardigheden
          </h2>
          <Link to="/bezienswaardigheden" className="section-link">
            Bekijk alle
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-2">
          {featuredAttractions.map((item) => (
            <Card
              key={`attraction-${item.id}`}
              id={item.id}
              type="attraction"
              title={item.title}
              description={item.description}
              image={item.image}
              subtitle={item.subtitle}
            />
          ))}
        </div>
      </section>

      {/* Featured Activities */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">
            <Calendar size={24} />
            Activiteiten
          </h2>
          <Link to="/activiteiten" className="section-link">
            Bekijk alle
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-2">
          {featuredActivities.map((item) => (
            <Card
              key={`activity-${item.id}`}
              id={item.id}
              type="activity"
              title={item.title}
              description={item.description}
              image={item.image}
              subtitle={item.subtitle}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Klaar voor de reis?</h2>
          <p>Vind alle praktische informatie voor een soepele excursie.</p>
          <Link to="/praktisch" className="btn btn-primary">
            Praktische Info
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
