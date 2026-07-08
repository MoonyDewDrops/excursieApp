import { Heart } from 'lucide-react';
import './Card.css';

export default function Card({
  title,
  subtitle,
  description,
  image,
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
                    <button
                        className="card-favorite"
                    >
                        <Heart size={20} />
                    </button>
                </div>
                {description && <p className="card-description">{description}</p>}
            </div>
        </article>
    );
}
