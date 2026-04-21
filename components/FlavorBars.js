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
            <span className="flavor-section-title">Taste Meter (स्वाद मीटर)</span>
            <div className="flavor-bars-container">
                {categories.map(cat => (
                    <div key={cat.key} className="flavor-bar-row">
                        <div className="flavor-label-group">
                            <span className="flavor-name">
                                {cat.icon} {cat.label} <span className="hindi-label">({cat.hindi})</span>
                            </span>
                        </div>
                        <div className="flavor-bar-track">
                            <div className="flavor-bar-fill" style={{ width: `${(profile[cat.key] || 0) * 10}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
