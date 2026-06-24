'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ChatPage() {
    return (
        <main className="main-wrapper">
            <Navbar />
            
            <section className="royal-section" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
                <div className="section-header">
                    <span className="section-label">24/7 Support</span>
                    <h1 className="section-display">Live Chat</h1>
                </div>
            </section>

            <section className="royal-section alt-cream" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="chat-container">
                    <i className="fab fa-whatsapp chat-icon"></i>
                    <h2>Connect with us on WhatsApp</h2>
                    <p>For instant replies, product inquiries, and order tracking, our team is available on WhatsApp.</p>
                    <a 
                        href="https://wa.me/917014102742" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-royal"
                        style={{ display: 'inline-block', marginTop: '20px' }}
                    >
                        Start Chat Now
                    </a>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .chat-container {
                    background: #ffffff;
                    border: 1px solid #eeeeee;
                    border-radius: 12px;
                    padding: 50px 30px;
                    text-align: center;
                    max-width: 600px;
                    width: 100%;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                }
                .chat-icon {
                    font-size: 5rem;
                    color: #25D366;
                    margin-bottom: 20px;
                }
                .chat-container h2 {
                    font-family: 'Poppins', sans-serif;
                    color: #222;
                    margin-bottom: 15px;
                    font-size: 1.8rem;
                }
                .chat-container p {
                    color: #666;
                    font-family: 'Quicksand', sans-serif;
                    font-size: 1.1rem;
                    line-height: 1.6;
                }
            `}</style>
        </main>
    );
}
