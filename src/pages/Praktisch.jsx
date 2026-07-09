import { useState, useEffect, useMemo } from 'react';
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

//the icons, its kind of irking me rn so will change later
const sectionIcons = {
    "Contactinformatie": PhoneCall,
    "Vervoer": Train,
    "Praktische zaken": Briefcase,
    "Belangrijke regels": AlertCircle,
    "Quick Tips": MapPin,
};

export default function Praktisch() {
  const [praktischInfo, setPraktischInfo] = useState([]);

  useEffect(() => {
    async function fetchPraktischInfo() {
      try {
        const response = await fetch(
          "https://excursieapp-production.up.railway.app//api/praktisch"
        );

        const data = await response.json();

        setPraktischInfo(data);
      } catch (error) {
        console.error(
          "Fout bij ophalen praktische informatie:",
          error
        );
      }
    }

    fetchPraktischInfo();
  }, []);

  const groupedPraktisch = useMemo(() => {
    const groups = {};

    praktischInfo.forEach((item) => {
      if (!groups[item.section]) {
        groups[item.section] = [];
      }

      groups[item.section].push(item);
    });

    return Object.entries(groups).map(([title, items]) => ({
      title,
      items,
    }));
  }, [praktischInfo]);

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
        {groupedPraktisch.map((section) => {
          const SectionIcon = sectionIcons[section.title] || Info;
          if (section.title === "Quick Tips") {
            return (
              <section key={section.title} className="tips-section">
                <div className="tips-header">
                  <h2>
                    <MapPin size={22} />
                    {section.title}
                  </h2>
                </div>

                <ul className="tips-list">
                  {section.items.map((item, index) => (
                    <li key={item.id} className="tip-item">
                      <span className="tip-number">
                        {index + 1}.
                      </span>
                      <span className="tip-text">
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }
          return (
            <section key={section.title} className="info-section">
              <h2 className="section-header">
                <SectionIcon size={22} />
                {section.title}
              </h2>
              <div className="info-cards">
                {section.items.map((item, index) => {
                  const ItemIcon = Info;
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
      </div>
    </div>
  );
}
