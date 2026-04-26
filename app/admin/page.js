'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ orders: 0, users: 0 });

    useEffect(() => {
        if (authLoading) return;

        const adminEmail = 'kushsharma.cor@gmail.com';
        const currentUserEmail = user?.email?.toLowerCase().trim();

        if (!user || currentUserEmail !== adminEmail) {
            const timer = setTimeout(() => {
                if (!user || user.email?.toLowerCase().trim() !== adminEmail) {
                    router.push('/');
                }
            }, 800);
            return () => clearTimeout(timer);
        } else {
            const fetchStats = async () => {
                try {
                    const ordersSnap = await getDocs(collection(db, 'orders'));
                    // Fetch only users with actual data to avoid counting empty/test docs
                    const usersSnap = await getDocs(collection(db, 'users'));
                    
                    // Filter out any docs that don't have an email to get an accurate count
                    const validUsers = usersSnap.docs.filter(doc => doc.data().email).length;

                    setStats({
                        orders: ordersSnap.size,
                        users: validUsers
                    });
                } catch (err) {
                    console.error("Stats error:", err);
                }
            };
            fetchStats();
        }
    }, [user, authLoading, router]);

    if (authLoading || user?.email?.toLowerCase().trim() !== 'kushsharma.cor@gmail.com') {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdfbf7', color: '#8B0000', fontFamily: 'serif' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏰</div>
                    <h2>Authenticating Royal Access...</h2>
                    <p style={{ opacity: 0.6 }}>Only the Master of Mewari Achaar may enter.</p>
                </div>
            </div>
        );
    }

    const cards = [
        {
            title: 'Marketing Campaign',
            desc: 'Send royal invites to your Chittorgarh visitor list.',
            link: '/admin/campaign',
            icon: '✉️',
            color: '#8B0000'
        },
        {
            title: 'Order Management',
            desc: 'View and track all customer orders in real-time.',
            link: '/admin/orders',
            icon: '📦',
            color: '#D4AF37'
        },
        {
            title: 'Customer Directory',
            desc: 'Manage your registered members and their details.',
            link: '/admin/customers',
            icon: '👥',
            color: '#2C1810'
        }
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#fdfbf7', padding: '40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 style={{ color: '#8B0000', fontSize: '2.5rem', margin: 0, fontFamily: 'serif' }}>मेवाड़ी अचार - Admin Vault</h1>
                    <p style={{ color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Command Center for the Royal Taste</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                    <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderBottom: '4px solid #8B0000' }}>
                        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#666' }}>Total Orders</span>
                        <h2 style={{ margin: '5px 0', fontSize: '2rem', color: '#8B0000' }}>{stats.orders}</h2>
                    </div>
                    <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderBottom: '4px solid #D4AF37' }}>
                        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#666' }}>Registered Members</span>
                        <h2 style={{ margin: '5px 0', fontSize: '2rem', color: '#D4AF37' }}>{stats.users}</h2>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                    {cards.map((card, idx) => (
                        <Link href={card.link} key={idx} style={{ textDecoration: 'none' }}>
                            <div style={{ 
                                background: 'white', 
                                padding: '35px', 
                                borderRadius: '16px', 
                                boxShadow: '0 10px 30px rgba(0,0,0,0.03)', 
                                border: '1px solid #eee',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                cursor: 'pointer',
                                height: '100%'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 15px 45px rgba(0,0,0,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)';
                            }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{card.icon}</div>
                                <h3 style={{ color: card.color, margin: '0 0 10px 0', fontSize: '1.4rem' }}>{card.title}</h3>
                                <p style={{ color: '#666', lineHeight: '1.5', margin: 0 }}>{card.desc}</p>
                                <div style={{ marginTop: '20px', color: card.color, fontWeight: 'bold', fontSize: '0.9rem' }}>
                                    Open Portal →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <footer style={{ marginTop: '60px', textAlign: 'center', color: '#999', fontSize: '0.8rem' }}>
                    &copy; 2026 Mewari Homemade Achaar Administrative Interface. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
