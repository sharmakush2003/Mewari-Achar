"use client";

import { motion } from "framer-motion";
import { recipes } from "@/lib/recipes-data";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";

export default function RecipesPage() {
    return (
        <main className="rituals-container">
            <Navbar />
            
            <section className="rituals-hero">
                <div className="hero-grain"></div>
                <div className="hero-glow"></div>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-content"
                >
                    <div className="hero-crown-seal">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M20 5L24 13H16L20 5Z" fill="#D4AF37" />
                            <circle cx="20" cy="20" r="15" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="2 2" />
                        </svg>
                    </div>
                    <h1 className="hero-display">The Recipes of <br/><span>Mewari Achaar</span></h1>
                    <div className="hero-accents">
                        <div className="accent-line"></div>
                        <div className="accent-diamond"></div>
                        <div className="accent-line"></div>
                    </div>
                    <p className="hero-lead">
                        In our kitchen, a meal is never just food—it is a sequence of sacred pairings. 
                        Explore the artisanal traditions that have graced royal Mewari tables.
                    </p>
                </motion.div>
            </section>

            <section className="rituals-stack-section">
                <div className="side-heritage-label left">HERITAGE</div>
                
                <div className="rituals-stack">
                    {recipes.map((recipe, index) => (
                        <div key={recipe.id} className="recipe-wrapper">
                            <RecipeCard recipe={recipe} index={index} align={index % 2 === 0 ? 'left' : 'right'} />
                            {index < recipes.length - 1 && (
                                <div className="pichwai-divider-container">
                                    <svg className="pichwai-svg-divider" viewBox="0 0 400 20" fill="none">
                                        <path d="M0 10H180" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
                                        <path d="M220 10H400" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
                                        <path d="M200 2C198 2 196 4 196 6C196 8 198 10 200 10C202 10 204 8 204 6C204 4 202 2 200 2Z" fill="#8B0000" />
                                        <path d="M200 5C195 5 192 10 192 10C192 10 195 15 200 15C205 15 208 10 208 10C208 10 205 5 200 5Z" stroke="#D4AF37" strokeWidth="0.5" />
                                        <circle cx="200" cy="10" r="1.5" fill="#D4AF37" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <footer className="rituals-footer">
                <div className="footer-grain"></div>
                <div className="footer-content">
                    <p>Crafted with Heritage in the Heart of Rajasthan</p>
                </div>
            </footer>

            <style jsx>{`
                .rituals-container {
                    min-height: 100vh;
                    background: #faf9f2;
                    color: #2c1810;
                    overflow-x: hidden;
                    width: 100%;
                }

                .rituals-hero {
                    position: relative;
                    align-items: center;
                    justify-content: flex-start;
                    text-align: center;
                    padding: 40px 24px 80px; /* Reduced top padding */
                    overflow: hidden;
                }

                .hero-grain {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background-image: url("https://www.transparenttextures.com/patterns/paper.png");
                    opacity: 0.15;
                    pointer-events: none;
                    z-index: 1;
                }

                .hero-glow {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    max-width: 800px;
                    height: 80vh;
                    background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
                    pointer-events: none;
                }

                .hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 800px;
                    width: 100%;
                }

                .hero-crown-seal {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 25px;
                }

                .hero-crown-seal span {
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 6px;
                    color: #D4AF37;
                    font-weight: 700;
                    margin-top: 5px;
                }

                .hero-display {
                    font-family: var(--font-royal, 'Playfair Display'), serif;
                    font-size: clamp(2.2rem, 7vw, 4.5rem); /* Further reduced */
                    line-height: 1.1;
                    margin-bottom: 25px;
                    font-weight: 400;
                    letter-spacing: -1px;
                    color: #2c1810;
                }

                .hero-display span {
                    color: #D4AF37;
                    font-style: italic;
                    font-weight: 400;
                }

                .hero-accents {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 30px;
                }

                .accent-line {
                    width: 60px;
                    height: 1px;
                    background: linear-gradient(to right, transparent, rgba(212, 175, 55, 0.4), transparent);
                }

                .accent-diamond {
                    width: 6px;
                    height: 6px;
                    border: 1px solid #D4AF37;
                    transform: rotate(45deg);
                }

                .hero-lead {
                    max-width: 550px;
                    margin: 0 auto;
                    font-size: 1.1rem;
                    color: #5a4a42;
                    line-height: 1.8;
                    font-weight: 300;
                    letter-spacing: 0.2px;
                }

                .rituals-stack-section {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px 150px;
                    position: relative;
                }

                .side-heritage-label {
                    position: absolute;
                    top: 100px;
                    font-size: 0.65rem;
                    font-weight: 700;
                    letter-spacing: 12px;
                    color: #8B0000;
                    opacity: 0.2;
                    writing-mode: vertical-rl;
                    text-transform: uppercase;
                    height: 80%;
                    pointer-events: none;
                }

                .side-heritage-label.left { left: -40px; }
                .side-heritage-label.right { right: -40px; transform: rotate(180deg); }

                .rituals-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 150px;
                    align-items: center;
                    width: 100%;
                }

                .recipe-wrapper {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 100px;
                }

                .pichwai-divider-container {
                    width: 100%;
                    max-width: 500px;
                    margin: 0 auto;
                }

                .pichwai-svg-divider {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                .rituals-footer {
                    position: relative;
                    padding: 100px 24px;
                    text-align: center;
                    background: #f4f3ed;
                    border-top: 1px solid rgba(139, 0, 0, 0.1);
                }

                .footer-content p {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    color: rgba(44, 24, 16, 0.4);
                    margin-bottom: 15px;
                }


                @media (max-width: 768px) {
                    .rituals-hero {
                        min-height: auto;
                        padding: 20px 24px;
                    }
                    .hero-display {
                        font-size: 2.8rem;
                    }
                    .hero-lead {
                        font-size: 1rem;
                    }
                    .rituals-stack {
                        gap: 80px;
                    }
                }
            `}</style>
        </main>
    );
}
