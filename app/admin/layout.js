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
                            src="/favicon.png" 
                            alt="Mewari Achaar Logo" 
                            className="royal-logo-img"
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
                        padding: 15px;
                        overflow-y: auto;
                        font-family: var(--font-main), serif;
                        -webkit-overflow-scrolling: touch;
                    }

                    .royal-gate-overlay::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23D4AF37' fill-opacity='0.03'/%3E%3C/svg%3E");
                        opacity: 0.5;
                        pointer-events: none;
                    }

                    .royal-card {
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(15px);
                        border: 1px solid rgba(212, 175, 55, 0.3);
                        padding: 30px 20px;
                        border-radius: 24px;
                        text-align: center;
                        max-width: 400px;
                        width: 100%;
                        position: relative;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8);
                        animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                        margin: auto;
                    }

                    .shield-container {
                        width: 90px;
                        height: 90px;
                        margin: 0 auto 20px;
                        filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.4));
                        animation: float 4s ease-in-out infinite;
                    }

                    .royal-logo-img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }

                    .royal-title {
                        color: #D4AF37;
                        font-family: var(--font-heading), serif;
                        font-size: 1.5rem;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        font-weight: 700;
                    }

                    .royal-divider {
                        height: 1px;
                        background: linear-gradient(90deg, transparent, #D4AF37, transparent);
                        width: 80%;
                        margin: 0 auto 15px;
                        position: relative;
                    }

                    .gold-diamond {
                        width: 8px;
                        height: 8px;
                        background: #D4AF37;
                        transform: rotate(45deg);
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        margin-left: -4px;
                        margin-top: -4px;
                        box-shadow: 0 0 8px #D4AF37;
                    }

                    .royal-message {
                        color: #e5e5e5;
                        line-height: 1.6;
                        font-size: 0.95rem;
                        margin-bottom: 20px;
                    }

                    .royal-message strong {
                        color: #D4AF37;
                    }

                    .restriction-banner {
                        background: rgba(139, 0, 0, 0.4);
                        border: 1px solid rgba(212, 175, 55, 0.2);
                        padding: 12px;
                        border-radius: 12px;
                        margin-bottom: 25px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        text-align: left;
                    }

                    .banner-icon {
                        font-size: 1.2rem;
                    }

                    .restriction-banner p {
                        color: #ffcccc;
                        font-size: 0.8rem;
                        margin: 0;
                        line-height: 1.3;
                    }

                    .royal-btn {
                        width: 100%;
                        padding: 15px;
                        background: linear-gradient(135deg, #8B0000 0%, #4a0000 100%);
                        color: white;
                        border: 1px solid #D4AF37;
                        border-radius: 50px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 8px 15px rgba(0,0,0,0.4);
                        font-size: 0.9rem;
                    }

                    .royal-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 12px 25px rgba(139, 0, 0, 0.5);
                        filter: brightness(1.2);
                    }

                    .royal-footer {
                        margin-top: 20px;
                        color: rgba(212, 175, 55, 0.4);
                        font-size: 0.65rem;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                    }

                    @keyframes float {
                        0%, 100% { transform: translateY(0) rotate(0deg); }
                        50% { transform: translateY(-10px) rotate(2deg); }
                    }

                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @media (max-height: 600px) {
                        .royal-card { padding: 20px 15px; }
                        .shield-container { width: 60px; height: 60px; margin-bottom: 10px; }
                        .royal-title { font-size: 1.2rem; }
                        .royal-message { font-size: 0.85rem; margin-bottom: 15px; }
                        .restriction-banner { margin-bottom: 20px; }
                    }
                `}</style>
            </div>
        );
    }

    return <>{children}</>;
}
