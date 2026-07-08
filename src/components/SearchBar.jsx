import { Search, X } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ value, placeholder = 'Zoeken...' }) {
    return (
        <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
                type="text"
                value={value}
                readOnly
                placeholder={placeholder}
                className="search-input"
            />
            {value && (
                <button
                    className="search-clear"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}
