'use client';

import React from 'react';

export default function FlavorSlider({ profile, onChange }) {
    if (!profile) return null;
    
    const categories = [
        { key: 'spicy', label: 'Spicy', hindi: 'तीखा', icon: '🌶️', color: '#8B0000', secondary: '#FF4D4D' },
        { key: 'tangy', label: 'Tangy', hindi: 'खट्टा', icon: '🍋', color: '#D4AF37', secondary: '#FFD700' },
        { key: 'earthy', label: 'Earthy', hindi: 'सोंधा', icon: '🌿', color: '#138808', secondary: '#2E7D32' },
        { key: 'pungent', label: 'Pungent', hindi: 'तेज़', icon: '🧄', color: '#5D4037', secondary: '#8D6E63' }
    ];

    return (
        <div className="royal-customizer">
            <div className="customizer-header">
                <div className="header-decoration left"></div>
                <div className="header-text">
                    <span className="shahi-title">Shahi Swaad Customizer</span>
                    <span className="hindi-shahi">(स्वाद का चयन करें)</span>
                </div>
                <div className="header-decoration right"></div>
            </div>

            <div className="sliders-grid">
                {categories.map(cat => (
                    <div key={cat.key} className="royal-slider-box">
                        <div className="slider-label-area">
                            <div className="label-main">
                                <span className="cat-icon">{cat.icon}</span>
                                <span className="cat-hindi">{cat.hindi}</span>
                            </div>
                            <span className="cat-value">{profile[cat.key]}/10</span>
                        </div>
                        
                        <div className="royal-track-container">
                            <input 
                                type="range" 
                                min="1" 
                                max="10" 
                                value={profile[cat.key] || 1} 
                                onChange={(e) => onChange(cat.key, parseInt(e.target.value))}
                                className="royal-range-input"
                                style={{ 
                                    '--primary': cat.color,
                                    '--secondary': cat.secondary
                                }}
                            />
                            <div className="track-ticks">
                                {[...Array(10)].map((_, i) => <div key={i} className="tick"></div>)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <style jsx>{`
                .royal-customizer {
                    margin: 10px 0;
                    padding: 12px;
                    background: #fffcf5;
                    border: 1px solid rgba(212, 175, 55, 0.5);
                    border-radius: 10px;
                    box-shadow: inset 0 0 10px rgba(212, 175, 55, 0.05);
                }
                .customizer-header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 12px;
                }
                .shahi-title {
                    font-family: var(--font-royal, serif);
                    font-size: 0.7rem;
                    color: #8B0000;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .hindi-shahi {
                    display: none; /* Hide secondary text for compactness */
                }
                .sliders-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px 15px;
                }
                .royal-slider-box {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .cat-hindi {
                    font-family: var(--font-devanagari);
                    font-weight: 700;
                    color: #2c1810;
                    font-size: 0.75rem;
                }
                .cat-value {
                    font-family: 'Outfit', sans-serif;
                    font-weight: 800;
                    color: #8B0000;
                    font-size: 0.65rem;
                    background: rgba(139, 0, 0, 0.05);
                    padding: 1px 5px;
                    border-radius: 3px;
                }
                .royal-track-container {
                    position: relative;
                    padding: 2px 0;
                }
                .royal-range-input {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 4px;
                    background: #e5e5e5;
                    border-radius: 2px;
                    outline: none;
                    cursor: pointer;
                }
                .royal-range-input::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    background: radial-gradient(circle at 30% 30%, var(--secondary), var(--primary));
                    border: 1.5px solid #fff;
                    border-radius: 50%;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                .tick {
                    width: 1.5px;
                    height: 1.5px;
                }
            `}</style>
        </div>
    );
}
