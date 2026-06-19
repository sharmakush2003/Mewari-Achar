import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function Footer({ onOpenPolicy, onOpenSupport }) {
    const { t } = useLanguage();
    return (
        <footer className="royal-footer">
            <div className="footer-main-content">
                <div className="footer-brand">
                    <h2 className="footer-logo">Mewari <br/>Achaar</h2>
                    <p className="footer-tagline">{t('footerTagline')}</p>
                </div>
                
                <div className="footer-trust-badges">
                   <div className="trust-inner">
                      <div className="trust-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
                           <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                        </svg>
                      </div>
                      <div className="trust-text">
                         <span className="trust-label">{t('msmeCertified')}</span>
                         <span className="trust-val">UDYAM-RJ-10-0076393</span>
                      </div>
                   </div>

                   <div className="trust-inner">
                      <div className="trust-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#138808" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                           <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      </div>
                      <div className="trust-text">
                         <span className="trust-label">{t('fssaiTitle')}</span>
                         <span className="trust-val">22226028000380</span>
                      </div>
                   </div>
                </div>

                <div className="footer-nav">
                    <Link href="/privacy-policy" className="footer-btn" style={{ textDecoration: 'none' }}>{t('policy')}</Link>
                    <div className="gold-dot"></div>
                    <button onClick={onOpenSupport} className="footer-btn">{t('supportContact')}</button>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="dev-credit-wrapper">
                    <a href="https://chittortech.online" target="_blank" rel="noopener noreferrer" className="dev-credit-pill">
                        <img src="/ct-logo.png" alt="ChittorTech Logo" />
                        <p>Developed & Maintained by <span>ChittorTech</span></p>
                    </a>
                </div>
                <div style={{ marginBottom: '10px', color: '#8B0000', fontWeight: '700', fontSize: '0.9rem' }}>mewariachar@gmail.com</div>
                <div className="footer-copyright">© 2026 Mewari Homemade Achaar. All Rights Reserved.</div>
            </div>

            <style jsx>{`
                .royal-footer {
                    background: #faf9f2;
                    padding: 80px 20px 60px;
                    text-align: center;
                    border-top: 1px solid rgba(139, 0, 0, 0.05);
                }
                .footer-logo {
                    font-family: var(--font-royal, serif);
                    font-size: 3.5rem;
                    line-height: 0.9;
                    color: #8B0000;
                    margin-bottom: 25px;
                }
                .footer-tagline {
                    font-family: var(--font-devanagari), serif;
                    font-style: italic;
                    color: #5a4a42;
                    opacity: 0.7;
                    font-size: 1.15rem;
                    line-height: 1.6;
                    margin-bottom: 45px;
                    letter-spacing: 0.5px;
                }
                .footer-trust-badges {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-bottom: 50px;
                }
                .trust-inner {
                    background: #fff;
                    padding: 15px 35px;
                    border-radius: 60px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    border: 1px solid rgba(139, 0, 0, 0.1);
                }
                .trust-text {
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                    font-family: var(--font-main);
                }
                .trust-label {
                    color: #8B0000;
                    font-weight: 800;
                    font-size: 0.75rem;
                    letter-spacing: 1px;
                    font-family: var(--font-devanagari);
                }
                .trust-val {
                    font-weight: 700;
                    color: var(--text-color);
                    font-size: 0.75rem;
                    opacity: 0.8;
                }
                .footer-nav {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 30px;
                    margin-bottom: 60px;
                }
                .footer-btn {
                    background: none;
                    border: none;
                    color: #5a4a42;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    text-decoration: none;
                    font-family: var(--font-devanagari);
                }
                .gold-dot {
                    width: 5px;
                    height: 5px;
                    background: #D4AF37;
                    border-radius: 50%;
                }
                
                /* Developer Credit Pill Style */
                .dev-credit-wrapper {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 2.5rem;
                    margin-top: 1rem;
                }

                .dev-credit-pill {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: #2c1810;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 12px 24px;
                    border-radius: 50px;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    backdrop-filter: blur(15px);
                }

                .dev-credit-pill:hover {
                    background: #3d2419;
                    border-color: #8B0000;
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
                }

                .dev-credit-pill img {
                    height: 28px;
                    width: auto;
                    border-radius: 6px;
                    object-fit: contain;
                }

                .dev-credit-pill p {
                    margin: 0;
                    font-size: 0.9rem;
                    color: #ffffff;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                }

                .dev-credit-pill p span {
                    color: #2ecc71;
                    font-weight: 700;
                    margin-left: 4px;
                }

                .footer-copyright {
                    font-size: 0.75rem;
                    color: #5a4a42;
                    opacity: 0.5;
                    letter-spacing: 0.5px;
                }
            `}</style>
        </footer>
    );
}
