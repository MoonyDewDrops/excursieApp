import { NavLink } from 'react-router-dom';
import {
  Home,
  MapPin,
  Calendar,
  Info,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import './Navigation.css';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/bezienswaardigheden', label: 'Bezienswaardigheden', icon: MapPin },
  { path: '/activiteiten', label: 'Activiteiten', icon: Calendar },
  { path: '/praktisch', label: 'Praktisch', icon: Info },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
          <span className="nav-logo-icon">B</span>
          <span className="nav-logo-text">Berlin</span>
        </NavLink>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${isOpen ? 'nav-links-open' : ''}`}>
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
