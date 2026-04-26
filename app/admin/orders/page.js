'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminOrders() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && user?.email !== 'kushsharma.cor@gmail.com') {
            router.push('/');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user?.email === 'kushsharma.cor@gmail.com') {
            const fetchOrders = async () => {
                try {
                    const q = query(collection(db, 'orders'));
                    const querySnapshot = await getDocs(q);
                    const ordersList = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    ordersList.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
                    setOrders(ordersList);
                } catch (err) {
                    console.error(err);
                }
                setLoading(false);
            };
            fetchOrders();
        }
    }, [user]);

    if (authLoading || user?.email !== 'kushsharma.cor@gmail.com') {
        return <div style={{ padding: '100px', textAlign: 'center', color: '#8B0000' }}>🏰 Verifying Admin Status...</div>;
    }

    return (
        <div style={{ minHeight: '100vh', background: '#fdfbf7', padding: '40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ color: '#8B0000', margin: 0, fontFamily: 'serif' }}>📦 Order Management</h1>
                        <p style={{ color: '#666' }}>Track and manage all customer purchases.</p>
                    </div>
                    <button onClick={() => router.push('/admin')} style={{ padding: '10px 20px', background: 'none', border: '1px solid #8B0000', color: '#8B0000', borderRadius: '6px', cursor: 'pointer' }}>
                        Back to Dashboard
                    </button>
                </header>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '100px' }}>Loading orders...</div>
                ) : (
                    <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#8B0000', color: 'white' }}>
                                <tr>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Order ID</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Customer</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Total Amount</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '15px' }}>{order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : 'N/A'}</td>
                                        <td style={{ padding: '15px', fontWeight: 'bold' }}>#{order.id.slice(0, 8)}</td>
                                        <td style={{ padding: '15px' }}>
                                            {order.userName || 'Guest'}<br/>
                                            <span style={{ fontSize: '0.8rem', color: '#666' }}>{order.userEmail}</span>
                                        </td>
                                        <td style={{ padding: '15px', fontWeight: 'bold' }}>₹{order.totalAmount}</td>
                                        <td style={{ padding: '15px' }}>
                                            <span style={{ 
                                                padding: '4px 12px', 
                                                borderRadius: '20px', 
                                                fontSize: '0.8rem',
                                                background: order.status === 'Completed' ? '#e6fffa' : '#fffaf0',
                                                color: order.status === 'Completed' ? '#2c7a7b' : '#b7791f',
                                                border: `1px solid ${order.status === 'Completed' ? '#b2f5ea' : '#fbd38d'}`
                                            }}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {orders.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>No orders found yet.</div>}
                    </div>
                )}
            </div>
        </div>
    );
}
