'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutUs() {
    const { t } = useLanguage();

    return (
        <main className="main-wrapper">
            <Navbar />
            
            <section className="royal-section" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
                <div className="section-header">
                    <span className="section-label">Our Story</span>
                    <h1 className="section-display">About Mewari Achaar</h1>
                    <p className="hero-lead" style={{ margin: '20px auto 0', maxWidth: '700px', textAlign: 'center' }}>
                        Bringing the authentic, centuries-old pickle recipes of the Mewar region right to your dining table.
                    </p>
                </div>
            </section>

            <section className="royal-section alt-cream">
                <div className="about-content">
                    <div className="about-card">
                        <h2>Our Heritage</h2>
                        <p>
                            Born in the historic city of Chittorgarh, Mewari Achaar is more than just a pickle brand. It is a tribute to the royal culinary traditions of Rajasthan. We preserve the methods used by our ancestors to ensure every jar is packed with authentic flavor.
                        </p>
                    </div>

                    <div className="about-card">
                        <h2>Our Process</h2>
                        <p>
                            We believe in the power of nature. Our pickles are made using hand-picked, farm-fresh ingredients. We use pure mustard oil and sun-dry our spices (like the famous Mathania mirchi) to naturally preserve the crunch and taste without any artificial chemicals.
                        </p>
                    </div>

                    <div className="about-card">
                        <h2>Our Promise</h2>
                        <p>
                            As an FSSAI & MSME certified enterprise, quality is our top priority. We promise to deliver homemade goodness that tastes just like a mother's love, shipped safely in glass jars across India.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .about-content {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 5%;
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }
                .about-card {
                    background: #ffffff;
                    border: 1px solid #eeeeee;
                    border-radius: 8px;
                    padding: 40px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
                }
                .about-card h2 {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.8rem;
                    color: #ea72ab;
                    margin-bottom: 20px;
                }
                .about-card p {
                    font-family: 'Quicksand', sans-serif;
                    font-size: 1.1rem;
                    color: #555555;
                    line-height: 1.8;
                }
            `}</style>
        </main>
    );
}
