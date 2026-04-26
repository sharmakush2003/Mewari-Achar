'use client';

import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => {
            // Restriction applies to screens narrower than 1024px (standard tablet/laptop breakpoint)
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) return null;

    if (isMobile) {
        return (
            <div className="royal-gate-overlay">
                <div className="royal-card">
                    <div className="shield-container">
                        <img 
                            src="/Images/royal_shield.png" 
                            alt="Royal Shield" 
                            className="royal-shield-img"
                        />
                    </div>
                    
                    <h1 className="royal-title">Royal Access Restricted</h1>
                    <div className="royal-divider">
                        <div className="gold-diamond"></div>
                    </div>
                    
                    <p className="royal-message">
                        The <strong>Mewari Administrative Vault</strong> is guarded with precise protocols. 
                        Its intricate scrolls and ledgers are only compatible with <strong>Desktop Sovereignty</strong>.
                    </p>
                    
                    <div className="restriction-banner">
                        <span className="banner-icon">📜</span>
                        <p>Access from mobile devices is strictly prohibited by order of the Royal Taste.</p>
                    </div>
                    
                    <button 
                        onClick={() => window.location.href = '/'} 
                        className="royal-btn"
                    >
                        Return to Kingdom Home
                    </button>
                    
                    <div className="royal-footer">
                        Secure Desktop Session Required • &copy; 2026 Mewari Achaar
                    </div>
                </div>

                <style>{`
                    .royal-gate-overlay {
                        position: fixed;
                        inset: 0;
                        background: radial-gradient(circle at center, #3d0000 0%, #1a0000 100%);
                        z-index: 9999999;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                        overflow: hidden;
                        font-family: var(--font-main), serif;
                    }

                    .royal-gate-overlay::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23D4AF37' fill-opacity='0.03'/%3E%3C/svg%3E");
                        opacity: 0.5;
                    }

                    .royal-card {
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(15px);
                        border: 1px solid rgba(212, 175, 55, 0.3);
                        padding: 40px 30px;
                        border-radius: 30px;
                        text-align: center;
                        max-width: 450px;
                        width: 100%;
                        position: relative;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
                        animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                    }

                    .shield-container {
                        width: 160px;
                        height: 160px;
                        margin: 0 auto 25px;
                        filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.4));
                        animation: float 4s ease-in-out infinite;
                    }

                    .royal-shield-img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }

                    .royal-title {
                        color: #D4AF37;
                        font-family: var(--font-heading), serif;
                        font-size: 1.8rem;
                        margin-bottom: 12px;
                        text-transform: uppercase;
                        letter-spacing: 3px;
                        font-weight: 700;
                    }

                    .royal-divider {
                        height: 1px;
                        background: linear-gradient(90deg, transparent, #D4AF37, transparent);
                        width: 80%;
                        margin: 0 auto 20px;
                        position: relative;
                    }

                    .gold-diamond {
                        width: 10px;
                        height: 10px;
                        background: #D4AF37;
                        transform: rotate(45deg);
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-left: -5px;
                        margin-top: -5px;
                        box-shadow: 0 0 10px #D4AF37;
                    }

                    .royal-message {
                        color: #e5e5e5;
                        line-height: 1.7;
                        font-size: 1.05rem;
                        margin-bottom: 25px;
                    }

                    .royal-message strong {
                        color: #D4AF37;
                    }

                    .restriction-banner {
                        background: rgba(139, 0, 0, 0.4);
                        border: 1px solid rgba(212, 175, 55, 0.2);
                        padding: 15px;
                        border-radius: 12px;
                        margin-bottom: 30px;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        text-align: left;
                    }

                    .banner-icon {
                        font-size: 1.5rem;
                    }

                    .restriction-banner p {
                        color: #ffcccc;
                        font-size: 0.85rem;
                        margin: 0;
                        line-height: 1.4;
                    }

                    .royal-btn {
                        width: 100%;
                        padding: 18px;
                        background: linear-gradient(135deg, #8B0000 0%, #4a0000 100%);
                        color: white;
                        border: 1px solid #D4AF37;
                        border-radius: 50px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.4);
                    }

                    .royal-btn:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 15px 30px rgba(139, 0, 0, 0.5);
                        filter: brightness(1.2);
                    }

                    .royal-footer {
                        margin-top: 30px;
                        color: rgba(212, 175, 55, 0.4);
                        font-size: 0.7rem;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                    }

                    @keyframes float {
                        0%, 100% { transform: translateY(0) rotate(0deg); }
                        50% { transform: translateY(-15px) rotate(2deg); }
                    }

                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(40px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @media (max-width: 480px) {
                        .royal-card {
                            padding: 30px 20px;
                        }
                        .royal-title {
                            font-size: 1.5rem;
                        }
                    }
                `}</style>
            </div>
        );
    }

    return <>{children}</>;
}
