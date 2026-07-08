import {
  Info,
  Phone,
  MapPin,
  Clock,
  Euro,
  PhoneCall,
  Briefcase,
  AlertCircle,
  Train,
  Utensils,
} from 'lucide-react';
import './Praktisch.css';

const infoSections = [
  {
    title: 'Contactinformatie',
    icon: PhoneCall,
    items: [
      {
        icon: Phone,
        label: 'Noodnummer begeleider',
        value: '+31 6 XXX XXX XX',
      },
      {
        icon: Phone,
        label: 'Europese noodlijn',
        value: '112',
      },
      {
        icon: Info,
        label: 'School',
        value: '[Naam school]',
      },
    ],
  },
  {
    title: 'Vervoer',
    icon: Train,
    items: [
      {
        icon: Train,
        label: 'Openbaar vervoer',
        value: 'Berlijn heeft een uitstekend metronetwerk. AB-zone voldoet voor alle bezienswaardigheden.',
      },
      {
        icon: Clock,
        label: 'Vertrek bus',
        value: '[Tijden volgen hier]',
      },
    ],
  },
  {
    title: 'Praktische zaken',
    icon: Briefcase,
    items: [
      {
        icon: Euro,
        label: 'Zakgeld',
        value: 'Voor eten, dranken en souvenirs. Reken op ongeveer 20-30 euro per dag.',
      },
      {
        icon: Utensils,
        label: 'Eten & drinken',
        value: 'Currywurst en Döner zijn must-tries in Berlijn. Supermarkten zijn goedkoper.',
      },
    ],
  },
  {
    title: 'Belangrijke regels',
    icon: AlertCircle,
    items: [
      {
        icon: AlertCircle,
        label: 'Gedrag',
        value: 'Volg altijd de instructies van begeleiders. Respecteer andere bezoekers bij monumenten.',
      },
      {
        icon: Clock,
        label: 'Verzameltijden',
        value: 'Wees op tijd bij afspraken. De groep vertrekt niet zonder je.',
      },
    ],
  },
];

const quickTips = [
  'Laad je telefoon elke avond op',
  'Draag comfortabele schoenen - we lopen veel',
  'Neem een flesje water mee',
  'Maak de groep niet te groot bij bezienswaardigheden',
  'Fotografeer alles, maar vergeet niet te genieten',
];

export default function Praktisch() {
  return (
    <div className="praktisch-page">
      <header className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">
            <Info size={28} />
            Praktische Informatie
          </h1>
          <p className="page-description">
            Alles wat je moet weten voor een geslaagde excursie
          </p>
        </div>
      </header>

      <div className="praktisch-content">
        {/* Info Sections */}
        {infoSections.map((section) => {
          const SectionIcon = section.icon;
          return (
            <section key={section.title} className="info-section">
              <h2 className="section-header">
                <SectionIcon size={22} />
                {section.title}
              </h2>
              <div className="info-cards">
                {section.items.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={index} className="info-card">
                      <div className="info-card-icon">
                        <ItemIcon size={20} />
                      </div>
                      <div className="info-card-content">
                        <h3>{item.label}</h3>
                        <p>{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Quick Tips */}
        <section className="tips-section">
          <div className="tips-header">
            <h2>
              <MapPin size={22} />
              Quick Tips
            </h2>
          </div>
          <ul className="tips-list">
            {quickTips.map((tip, index) => (
              <li key={index} className="tip-item">
                <span className="tip-number">{index + 1}</span>
                <span className="tip-text">{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
