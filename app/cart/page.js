'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CartPage() {
    return (
        <main className="main-wrapper">
            <Navbar />
            
            <section className="royal-section" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
                <div className="section-header">
                    <span className="section-label">Your Selection</span>
                    <h1 className="section-display">Royal Cart</h1>
                </div>
            </section>

            <section className="royal-section alt-cream" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="empty-state">
                    <i className="fas fa-shopping-basket empty-icon"></i>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any of our royal pickles to your cart yet.</p>
                    <Link href="/collection" className="btn-royal" style={{ display: 'inline-block', marginTop: '20px' }}>
                        Browse Collection
                    </Link>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .empty-state {
                    text-align: center;
                    max-width: 500px;
                    padding: 40px 20px;
                }
                .empty-icon {
                    font-size: 4rem;
                    color: #e0e0e0;
                    margin-bottom: 20px;
                }
                .empty-state h2 {
                    font-family: 'Poppins', sans-serif;
                    color: #222;
                    margin-bottom: 10px;
                }
                .empty-state p {
                    color: #666;
                    font-family: 'Quicksand', sans-serif;
                }
            `}</style>
        </main>
    );
}
