'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HelpSupport() {
    return (
        <main className="main-wrapper">
            <Navbar />
            
            <section className="royal-section" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
                <div className="section-header">
                    <span className="section-label">We Are Here For You</span>
                    <h1 className="section-display">Help & Support</h1>
                    <p className="hero-lead" style={{ margin: '20px auto 0', maxWidth: '600px', textAlign: 'center' }}>
                        Need assistance with your order or have a query about our pickles? Our support team is ready to help.
                    </p>
                </div>
            </section>

            <section className="royal-section alt-cream">
                <div className="support-content">
                    <div className="support-card">
                        <i className="fab fa-whatsapp support-icon"></i>
                        <h2>WhatsApp Support</h2>
                        <p>Get instant answers to your queries on WhatsApp. Available Monday to Saturday, 9 AM to 8 PM.</p>
                        <a 
                            href="https://wa.me/917014102742" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-royal"
                            style={{ textDecoration: 'none', display: 'inline-block', marginTop: '15px' }}
                        >
                            Chat on WhatsApp
                        </a>
                    </div>

                    <div className="support-card">
                        <i className="fas fa-envelope support-icon"></i>
                        <h2>Email Support</h2>
                        <p>Prefer writing to us? Drop an email and our team will get back to you within 24 hours.</p>
                        <a 
                            href="mailto:mewariachar@gmail.com" 
                            className="btn-royal"
                            style={{ textDecoration: 'none', display: 'inline-block', marginTop: '15px', background: '#333' }}
                        >
                            Email Us
                        </a>
                    </div>

                    <div className="support-card" style={{ gridColumn: '1 / -1' }}>
                        <i className="fas fa-map-marker-alt support-icon"></i>
                        <h2>Our Kitchen Address</h2>
                        <p>
                            <strong>Mewari Achaar</strong><br/>
                            123, Fort Road, Chittorgarh<br/>
                            Rajasthan, India - 312001
                        </p>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .support-content {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 0 5%;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                }
                .support-card {
                    background: #ffffff;
                    border: 1px solid #eeeeee;
                    border-radius: 8px;
                    padding: 40px;
                    text-align: center;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
                }
                .support-icon {
                    font-size: 3rem;
                    color: #ea72ab;
                    margin-bottom: 20px;
                }
                .support-card h2 {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.5rem;
                    color: #222222;
                    margin-bottom: 15px;
                }
                .support-card p {
                    font-family: 'Quicksand', sans-serif;
                    font-size: 1.05rem;
                    color: #555555;
                    line-height: 1.6;
                }
            `}</style>
        </main>
    );
}
