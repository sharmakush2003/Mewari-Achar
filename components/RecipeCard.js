"use client";

import { motion } from "framer-motion";

export default function RecipeCard({ recipe, index, align = 'left' }) {
    const isRight = align === 'right';

    return (
        <motion.div 
            initial={{ opacity: 0, x: isRight ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            className={`recipe-card-editorial ${isRight ? 'align-right' : 'align-left'}`}
        >
            <div className="card-media">
                <div className="image-reveal-wrapper">
                    <img 
                        src={recipe.image} 
                        alt={recipe.dish} 
                        className="recipe-main-image"
                    />
                    <div className="image-overlay-tint"></div>
                </div>
            </div>
            
            <div className="card-content">
                <div className="chapter-marker">
                    <div className="marker-line"></div>
                    <span>Chapter 0{index + 1}</span>
                </div>

                <div className="content-main">
                    <h3 className="pairing-category">{recipe.pairing}</h3>
                    <h2 className="dish-display-name">{recipe.dish}</h2>
                    <p className="dish-description">{recipe.description}</p>
                    
                    <div className="heritage-footer">
                        <div className="wisdom-box">
                            <span className="wisdom-label">Heritage Wisdom</span>
                            <p className="wisdom-text">{recipe.tip}</p>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .recipe-card-editorial {
                    display: flex;
                    align-items: center;
                    gap: 100px;
                    width: 100%;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .recipe-card-editorial.align-right {
                    flex-direction: row-reverse;
                }

                .card-media {
                    flex: 1.2;
                    position: relative;
                }

                .image-reveal-wrapper {
                    position: relative;
                    aspect-ratio: 4 / 5;
                    overflow: hidden;
                    border-radius: 2px;
                    box-shadow: 0 30px 60px rgba(44, 24, 16, 0.08);
                }

                .recipe-main-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 1.5s cubic-bezier(0.2, 1, 0.3, 1);
                }

                .recipe-card-editorial:hover .recipe-main-image {
                    transform: scale(1.05);
                }


                .card-content {
                    flex: 1;
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }

                .align-right .card-content {
                    text-align: right;
                    align-items: flex-end;
                }

                .chapter-marker {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    color: #D4AF37;
                    font-weight: 700;
                    font-size: 0.75rem;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                }

                .marker-line {
                    width: 40px;
                    height: 1px;
                    background: #D4AF37;
                }

                .pairing-category {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: rgba(44, 24, 16, 0.4);
                    margin-bottom: 15px;
                    font-weight: 600;
                }

                .dish-display-name {
                    font-family: var(--font-royal, serif);
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    color: #8B0000;
                    line-height: 1;
                    margin-bottom: 25px;
                    font-weight: 400;
                    letter-spacing: -1px;
                }

                .dish-description {
                    font-size: 1.15rem;
                    color: #5a4a42;
                    line-height: 1.8;
                    font-weight: 400;
                    opacity: 0.8;
                    max-width: 450px;
                }

                .heritage-footer {
                    margin-top: 20px;
                    border-left: 2px solid #D4AF37;
                    padding-left: 25px;
                }

                .align-right .heritage-footer {
                    border-left: none;
                    border-right: 2px solid #D4AF37;
                    padding-left: 0;
                    padding-right: 25px;
                }

                .wisdom-label {
                    display: block;
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: #8B0000;
                    font-weight: 800;
                    margin-bottom: 8px;
                }

                .wisdom-text {
                    font-size: 1rem;
                    font-style: italic;
                    color: #2c1810;
                    opacity: 0.7;
                }

                @media (max-width: 1024px) {
                    .recipe-card-editorial {
                        flex-direction: column !important;
                        gap: 50px;
                        text-align: center !important;
                        align-items: center !important;
                    }
                    .card-content {
                        text-align: center !important;
                        align-items: center !important;
                    }
                    .heritage-footer {
                        border-left: none !important;
                        border-right: none !important;
                        padding: 0 !important;
                    }
                    .dish-display-name {
                        font-size: 2.8rem;
                    }
                }
            `}} />
        </motion.div>
    );
}
