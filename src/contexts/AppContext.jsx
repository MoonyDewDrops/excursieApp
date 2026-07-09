import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('berlin_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('berlin_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id, type) => {
        const key = `${type}-${id}`;
        setFavorites(prev => {
            if (prev.includes(key)) {
                return prev.filter(f => f !== key);
            }
            return [...prev, key];
        });
    };

    const isFavorite = (id, type) => {
        return favorites.includes(`${type}-${id}`);
    };

    return (
        <AppContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}