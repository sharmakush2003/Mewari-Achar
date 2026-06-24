'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function WishlistPage() {
    return (
        <main className="main-wrapper">
            <Navbar />
            
            <section className="royal-section" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
                <div className="section-header">
                    <span className="section-label">Your Favorites</span>
                    <h1 className="section-display">My Wishlist</h1>
                </div>
            </section>

            <section className="royal-section alt-cream" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="empty-state">
                    <i className="fas fa-heart empty-icon" style={{ color: '#ffecf3' }}></i>
                    <h2>No items in wishlist</h2>
                    <p>Save your favorite Mewari pickles here to order them later.</p>
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
                    text-shadow: 0 0 10px rgba(234, 114, 171, 0.2);
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
