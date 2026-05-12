'use client';

export default function FlavorBars({ profile }) {
    if (!profile) return null;
    
    const categories = [
        { key: 'spicy', label: 'Spicy', hindi: 'तीखा', icon: '🌶️' },
        { key: 'tangy', label: 'Tangy', hindi: 'खट्टा', icon: '🍋' },
        { key: 'earthy', label: 'Earthy', hindi: 'सोंधा', icon: '🌿' },
        { key: 'pungent', label: 'Pungent', hindi: 'तेज़', icon: '🧄' }
    ];

    return (
        <div className="flavor-profile-section">
            <div className="flavor-header-row">
                <span className="flavor-section-title">Taste Meter (स्वाद मीटर)</span>
                <span className="flavor-legend">Intensities Rated 1-10</span>
            </div>
            <div className="flavor-bars-container">
                {categories.map(cat => (
                    <div key={cat.key} className="flavor-bar-row">
                        <div className="flavor-label-group">
                            <span className="flavor-name">
                                {cat.icon} {cat.label} <span className="hindi-label">({cat.hindi})</span>
                            </span>
                            <span className="flavor-rating">{profile[cat.key] || 0}/10</span>
                        </div>
                        <div className="flavor-bar-track">
                            <div className="flavor-bar-fill" style={{ width: `${(profile[cat.key] || 0) * 10}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
            
            <style jsx>{`
                .flavor-header-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .flavor-legend {
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    opacity: 0.6;
                    font-weight: 600;
                }
                .flavor-rating {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #8B0000;
                }
            `}</style>
        </div>
    );
}
