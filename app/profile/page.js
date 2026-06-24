'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
    const { user, logOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <main className="main-wrapper">
            <Navbar />
            
            <section className="royal-section" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
                <div className="section-header">
                    <span className="section-label">Your Account</span>
                    <h1 className="section-display">Royal Profile</h1>
                </div>
            </section>

            <section className="royal-section alt-cream">
                <div className="profile-container">
                    <div className="profile-card">
                        <div className="avatar-circle">
                            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <h2>{user.displayName || 'Valued Guest'}</h2>
                        <p>{user.email}</p>

                        <div className="profile-links">
                            <a href="/orders" className="profile-link">
                                <i className="fas fa-box"></i> My Orders
                            </a>
                            <a href="/wishlist" className="profile-link">
                                <i className="fas fa-heart"></i> My Wishlist
                            </a>
                            <a href="/pairing-guide" className="profile-link">
                                <i className="fas fa-utensils"></i> Recipe Pairings
                            </a>
                        </div>

                        <button onClick={logOut} className="btn-royal" style={{ marginTop: '30px', width: '100%', background: '#333' }}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .profile-container {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 0 20px;
                }
                .profile-card {
                    background: #ffffff;
                    border: 1px solid #eeeeee;
                    border-radius: 8px;
                    padding: 40px;
                    text-align: center;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
                }
                .avatar-circle {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: #ea72ab;
                    color: white;
                    font-size: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-family: 'Playfair Display', serif;
                }
                .profile-card h2 {
                    font-family: 'Poppins', sans-serif;
                    color: #222;
                    margin-bottom: 5px;
                }
                .profile-card p {
                    color: #666;
                    margin-bottom: 30px;
                }
                .profile-links {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    text-align: left;
                }
                .profile-link {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 15px;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    color: #444;
                    text-decoration: none;
                    transition: all 0.2s;
                }
                .profile-link:hover {
                    background: #fafafa;
                    border-color: #ddd;
                    color: #ea72ab;
                }
            `}</style>
        </main>
    );
}
