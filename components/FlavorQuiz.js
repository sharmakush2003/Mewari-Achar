'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/products-data';
import { useCart } from './CartContext';

export default function FlavorQuiz() {
    const { addToCart } = useCart();
    const [step, setStep] = useState(0); // 0: Start, 1: Spice, 2: Tangy, 3: Vibe, 4: Result
    const [answers, setAnswers] = useState({ spicy: 0, tangy: 0, vibe: '' });
    const [match, setMatch] = useState(null);

    const quizData = [
        {
            id: 'spicy',
            title_en: "How much heat can you handle?",
            title_hi: "आप कितना तीखा बर्दाश्त कर सकते हैं?",
            options: [
                { label_en: "Mild & Gentle", label_hi: "हल्का और कोमल", value: 3, icon: "🌿" },
                { label_en: "The Royal Medium", label_hi: "शाही मध्यम", value: 6, icon: "👑" },
                { label_en: "Fiery Rajasthan", label_hi: "तीखा राजस्थान", value: 9, icon: "🔥" }
            ]
        },
        {
            id: 'tangy',
            title_en: "How tangy should it be?",
            title_hi: "चटपटापन कितना होना चाहिए?",
            options: [
                { label_en: "Subtle Zest", label_hi: "हल्का चटपटा", value: 3, icon: "🍋" },
                { label_en: "Balanced", label_hi: "संतुलित", value: 6, icon: "⚖️" },
                { label_en: "Mouth-watering Sour", label_hi: "खट्टा और मज़ेदार", value: 10, icon: "🤤" }
            ]
        },
        {
            id: 'vibe',
            title_en: "Choose your flavor personality:",
            title_hi: "अपना फ्लेवर व्यक्तित्व चुनें:",
            options: [
                { label_en: "Earthy & Traditional", label_hi: "मिट्टी जैसा और पारंपरिक", value: 'earthy', icon: "🏺" },
                { label_en: "Bold & Pungent", label_hi: "तेज़ और तीक्ष्ण", value: 'pungent', icon: "⚡" }
            ]
        }
    ];

    const findMatch = (finalAnswers) => {
        let bestMatch = products[0];
        let minDiff = Infinity;

        products.forEach(product => {
            const spicyDiff = Math.abs(product.flavorProfile.spicy - finalAnswers.spicy);
            const tangyDiff = Math.abs(product.flavorProfile.tangy - finalAnswers.tangy);
            const vibeScore = finalAnswers.vibe === 'earthy' ? product.flavorProfile.earthy : product.flavorProfile.pungent;
            
            const totalDiff = (spicyDiff + tangyDiff) - (vibeScore * 1.5); // Weighted for personality

            if (totalDiff < minDiff) {
                minDiff = totalDiff;
                bestMatch = product;
            }
        });

        setMatch(bestMatch);
        setStep(4);
    };

    const handleNext = (value) => {
        const currentId = quizData[step - 1].id;
        const newAnswers = { ...answers, [currentId]: value };
        setAnswers(newAnswers);
        
        if (step < quizData.length) {
            setStep(step + 1);
        } else {
            findMatch(newAnswers);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
        exit: { opacity: 0, y: -30, transition: { duration: 0.4 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <div className="flavor-quiz-outer">
            <div className="flavor-quiz-container">
                <div className="quiz-pattern-overlay"></div>
                
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div 
                            key="start"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="quiz-step initial-step"
                        >
                            <div className="quiz-intro-content">
                                <div className="quiz-badge-ornament">
                                    <div className="line"></div>
                                    <div className="quiz-badge">Taste Discovery</div>
                                    <div className="line"></div>
                                </div>
                                <h2 className="quiz-display">Not sure which <span>Heritage Match</span> is yours?</h2>
                                <p className="quiz-lead">Let our royal algorithm find your perfect achaar companion. / हमारे शाही एल्गोरिदम को अपना आदर्श अचार साथी खोजने दें।</p>
                                <button className="btn-royal-gold large" onClick={() => setStep(1)}>
                                    Start Discovery / शुरू करें
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step > 0 && step <= quizData.length && (
                        <motion.div 
                            key={`step-${step}`}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="quiz-step"
                        >
                            <div className="step-nav">
                                <div className="step-current">Question {step} of 3</div>
                                <div className="step-progress-bar">
                                    <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="question-header">
                                <h3 className="step-title">{quizData[step - 1].title_en}</h3>
                                <p className="step-title-hi">{quizData[step - 1].title_hi}</p>
                            </div>
                            
                            <div className="quiz-options-grid">
                                {quizData[step - 1].options.map((opt, i) => (
                                    <motion.button 
                                        key={i} 
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, borderColor: '#D4AF37' }}
                                        whileTap={{ scale: 0.95 }}
                                        className="quiz-option-card" 
                                        onClick={() => handleNext(opt.value)}
                                    >
                                        <div className="opt-icon">{opt.icon}</div>
                                        <div className="opt-text">
                                            <span className="opt-en">{opt.label_en}</span>
                                            <span className="opt-hi">{opt.label_hi}</span>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <button className="quiz-restart" onClick={() => setStep(0)}>
                                <span>←</span> Restart Discovery / दोबारा शुरू करें
                            </button>
                        </motion.div>
                    )}

                    {step === 4 && match && (
                        <motion.div 
                            key="result"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="quiz-result"
                        >
                            <div className="result-header">
                                <div className="result-label-wrapper">
                                    <span className="result-label">THE GODS HAVE SPOKEN</span>
                                </div>
                                <h3 className="result-title">Your Perfect Match / आपका सही चुनाव</h3>
                            </div>

                            <div className="match-showcase">
                                <div className="match-visual-box" data-aos="zoom-in">
                                    <img src={match.image} alt={match.name} />
                                    <div className="match-badge-gold">100% Match</div>
                                </div>
                                <div className="match-content-box">
                                    <h4>{match.name}</h4>
                                    <p className="match-flavor-note">A harmonious blend crafted for your specific profile.</p>
                                    <p className="match-desc">{match.desc}</p>
                                    
                                    <div className="match-actions-stack">
                                        <button className="btn-royal-gold full" onClick={() => addToCart(match.id, '500g', products)}>
                                            Add to Basket / टोकरी में डालें
                                        </button>
                                        <button className="quiz-restart-link" onClick={() => setStep(0)}>
                                            Not what you expected? Take Quiz Again
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                .flavor-quiz-outer {
                    width: 100%;
                    padding: 40px 0;
                    display: flex;
                    justify-content: center;
                    background: var(--bg-color);
                }
                .flavor-quiz-container {
                    background: linear-gradient(145deg, #7a0000 0%, #8B0000 60%, #6b0000 100%);
                    border: 2px solid #D4AF37;
                    border-radius: 40px;
                    width: 100%;
                    max-width: 1000px;
                    min-height: 600px;
                    padding: 80px 40px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 50px 100px rgba(139, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .quiz-pattern-overlay {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-image: url("https://www.transparenttextures.com/patterns/paper.png");
                    opacity: 0.08;
                    pointer-events: none;
                }
                .quiz-step {
                    width: 100%;
                    max-width: 850px;
                    text-align: center;
                    position: relative;
                    z-index: 2;
                }
                .quiz-badge-ornament {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 30px;
                }
                .quiz-badge-ornament .line {
                    height: 1px;
                    width: 60px;
                    background: linear-gradient(to right, transparent, #D4AF37);
                }
                .quiz-badge-ornament .line:last-child {
                    background: linear-gradient(to left, transparent, #D4AF37);
                }
                .quiz-badge {
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    font-size: 0.8rem;
                    color: #D4AF37;
                    font-weight: 800;
                }
                .quiz-display {
                    font-family: var(--font-royal, serif);
                    font-size: clamp(2rem, 8vw, 3.5rem);
                    color: #fff;
                    line-height: 1.2;
                    margin-bottom: 25px;
                }
                .quiz-display span {
                    color: #D4AF37;
                    font-style: italic;
                }
                .quiz-lead {
                    color: rgba(255,255,255,0.8);
                    font-size: 1.2rem;
                    line-height: 1.6;
                    margin-bottom: 50px;
                    max-width: 650px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .btn-royal-gold {
                    background: #D4AF37;
                    color: #2c1810;
                    padding: 20px 50px;
                    border-radius: 50px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-size: 1rem;
                    border: none;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                .btn-royal-gold:hover {
                    background: #fff;
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
                }
                .step-nav {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 50px;
                }
                .step-current {
                    color: #D4AF37;
                    font-size: 0.85rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }
                .step-progress-bar {
                    width: 200px;
                    height: 4px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: #D4AF37;
                    transition: width 0.6s cubic-bezier(0.19, 1, 0.22, 1);
                }
                .step-title {
                    font-family: var(--font-royal, serif);
                    font-size: clamp(1.8rem, 4vw, 2.8rem);
                    color: #fff;
                    margin-bottom: 5px;
                }
                .step-title-hi {
                    font-size: 1.4rem;
                    color: rgba(212, 175, 55, 0.9);
                    margin-bottom: 50px;
                }
                .quiz-options-grid {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                    margin-bottom: 60px;
                }
                .quiz-option-card {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    padding: 40px 30px;
                    border-radius: 30px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                    width: 260px;
                    transition: all 0.4s ease;
                }
                .opt-icon { font-size: 3rem; margin-bottom: 10px; }
                .opt-text { display: flex; flex-direction: column; gap: 5px; }
                .opt-en { font-weight: 800; font-size: 1.2rem; color: #fff; }
                .opt-hi { font-size: 1rem; color: #D4AF37; font-weight: 600; }
                .quiz-restart {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.6);
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin: 20px auto 0;
                }
                .quiz-restart:hover { color: #D4AF37; }

                .result-label-wrapper {
                    display: inline-block;
                    border-top: 1px solid #D4AF37;
                    border-bottom: 1px solid #D4AF37;
                    padding: 8px 0;
                    margin-bottom: 25px;
                }
                .result-label {
                    color: #D4AF37;
                    letter-spacing: 6px;
                    font-weight: 900;
                    font-size: 0.8rem;
                }
                .result-title {
                    font-family: var(--font-royal, serif);
                    font-size: clamp(2.2rem, 5vw, 3.2rem);
                    color: #fff;
                    margin-bottom: 60px;
                }
                .match-showcase {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 60px;
                    background: rgba(0,0,0,0.2);
                    padding: 50px;
                    border-radius: 40px;
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    text-align: left;
                    align-items: center;
                }
                .match-visual-box {
                    position: relative;
                    border-radius: 30px;
                    overflow: hidden;
                    aspect-ratio: 1;
                    border: 2px solid #D4AF37;
                }
                .match-visual-box img { width: 100%; height: 100%; object-fit: cover; }
                .match-badge-gold {
                    position: absolute;
                    top: 25px; right: 25px;
                    background: #D4AF37;
                    color: #2c1810;
                    padding: 10px 20px;
                    border-radius: 50px;
                    font-weight: 900;
                    font-size: 0.8rem;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                }
                .match-content-box h4 {
                    font-family: var(--font-royal, serif);
                    font-size: 2.8rem;
                    color: #fff;
                    margin-bottom: 10px;
                }
                .match-flavor-note {
                    color: #D4AF37;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 0.85rem;
                    margin-bottom: 25px;
                }
                .match-desc {
                    color: rgba(255,255,255,0.85);
                    font-size: 1.15rem;
                    line-height: 1.8;
                    margin-bottom: 40px;
                }
                .match-actions-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .btn-royal-gold.full { width: 100%; text-align: center; }
                .quiz-restart-link {
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.6);
                    text-decoration: underline;
                    font-size: 0.95rem;
                    cursor: pointer;
                    text-align: left;
                    padding: 0;
                }
                .quiz-restart-link:hover { color: #fff; }

                @media (max-width: 968px) {
                    .flavor-quiz-container { padding: 60px 24px; min-height: 500px; }
                    .match-showcase { grid-template-columns: 1fr; gap: 40px; text-align: center; padding: 40px 24px; }
                    .match-content-box h4 { font-size: 2.2rem; }
                    .quiz-restart-link { text-align: center; }
                    .quiz-option-card { width: 100%; max-width: 320px; padding: 30px; }
                    .quiz-options-grid { flex-direction: column; align-items: center; }
                }
                @media (max-width: 480px) {
                    .quiz-display { font-size: 2rem; }
                    .step-title { font-size: 1.8rem; }
                }
            `}</style>
        </div>
    );
}
