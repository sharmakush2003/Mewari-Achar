export default function Footer({ onOpenPolicy, onOpenSupport }) {
    return (
        <footer className="royal-footer">
            <div className="footer-main-content">
                <div className="footer-brand">
                    <h2 className="footer-logo">Mewari <br/>Achaar</h2>
                    <p className="footer-tagline">Preserving the legacy of Rajasthani <br/>flavors, one jar at a time.</p>
                </div>
                
                <div className="footer-trust-badge">
                   <div className="trust-inner">
                      <div className="trust-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
                           <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                        </svg>
                      </div>
                      <div className="trust-text">
                         <span className="trust-label">MSME CERTIFIED ENTERPRISE</span>
                         <span className="trust-val">UDYAM-RJ-10-0076393</span>
                      </div>
                   </div>
                </div>

                <div className="footer-nav">
                    <button onClick={onOpenPolicy} className="footer-btn">POLICIES</button>
                    <div className="gold-dot"></div>
                    <button onClick={onOpenSupport} className="footer-btn">CONTACT SUPPORT</button>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="footer-copyright">© 2026 Mewari Homemade Achaar. All Rights Reserved.</div>
            </div>

            <style jsx>{`
                .royal-footer {
                    background: #fff;
                    padding: 80px 20px 40px;
                    text-align: center;
                    border-top: 1px solid rgba(0,0,0,0.03);
                }
                .footer-logo {
                    font-family: var(--font-royal, serif);
                    font-size: 3.5rem;
                    line-height: 0.9;
                    color: #8B0000;
                    margin-bottom: 25px;
                }
                .footer-tagline {
                    font-family: var(--font-royal, serif);
                    font-style: italic;
                    color: #5a4a42;
                    opacity: 0.7;
                    font-size: 1.15rem;
                    line-height: 1.6;
                    margin-bottom: 45px;
                }
                .footer-trust-badge {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 50px;
                }
                .trust-inner {
                    background: #fdfdfa;
                    padding: 15px 35px;
                    border-radius: 60px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    border: 1px solid rgba(212, 175, 55, 0.15);
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
                    letter-spacing: 2px;
                    font-size: 0.85rem;
                    cursor: pointer;
                    text-decoration: none;
                }
                .gold-dot {
                    width: 5px;
                    height: 5px;
                    background: #D4AF37;
                    border-radius: 50%;
                }
                .footer-copyright {
                    font-size: 0.75rem;
                    color: #5a4a42;
                    opacity: 0.4;
                    letter-spacing: 0.5px;
                }
            `}</style>
        </footer>
    );
}
