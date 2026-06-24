'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function OrdersPage() {
    return (
        <main className="main-wrapper">
            <Navbar />
            
            <section className="royal-section" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
                <div className="section-header">
                    <span className="section-label">Order History</span>
                    <h1 className="section-display">My Orders</h1>
                </div>
            </section>

            <section className="royal-section alt-cream" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="empty-state">
                    <i className="fas fa-box-open empty-icon"></i>
                    <h2>No past orders</h2>
                    <p>You haven't placed any orders with us yet.</p>
                    <Link href="/collection" className="btn-royal" style={{ display: 'inline-block', marginTop: '20px' }}>
                        Start Shopping
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
