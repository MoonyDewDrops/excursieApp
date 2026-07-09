import { Heart } from 'lucide-react';
import './Card.css';

export default function Card({
    title,
    subtitle,
    description,
    image,
    id,
    type,
    isFavorite,
    onToggleFavorite,
    onClick
}) {
    return (
        <article className="card-item" onClick={onClick}>
            {image && (
                <div className="card-image">
                    <img src={image} alt={title} loading="lazy" />
                </div>
            )}
            <div className="card-content">
                <div className="card-header">
                    <div>
                        <h3 className="card-title">{title}</h3>
                        {subtitle && <p className="card-subtitle">{subtitle}</p>}
                    </div>
                    {onToggleFavorite && (
                        <button
                            className={`card-favorite ${isFavorite ? 'is-favorite' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(id, type);
                            }}
                            aria-label={isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
                        >
                            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                        </button>
                    )}
                </div>
                {description && <p className="card-description">{description}</p>}
            </div>
        </article>
    );
}
