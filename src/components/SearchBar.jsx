import { Search, X } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = 'Zoeken...' }) {
    return (
        <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="search-input"
            />
            {value && (
                <button
                    className="search-clear"
                    onClick={() => onChange('')}
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}
