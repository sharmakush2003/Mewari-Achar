'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminCustomers() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

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
            const fetchCustomers = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'users'));
                    const customerList = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setCustomers(customerList);
                } catch (err) {
                    console.error(err);
                }
                setLoading(false);
            };
            fetchCustomers();
        }
    }, [user, authLoading, router]);

    if (authLoading || user?.email?.toLowerCase().trim() !== 'kushsharma.cor@gmail.com') {
        return <div style={{ padding: '100px', textAlign: 'center', color: '#8B0000', fontFamily: 'serif' }}>🏰 Verifying Admin Status...</div>;
    }

    return (
        <div style={{ minHeight: '100vh', background: '#fdfbf7', padding: '40px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ color: '#8B0000', margin: 0, fontFamily: 'serif' }}>👥 Customer Directory</h1>
                        <p style={{ color: '#666' }}>All registered members of the Mewari Achaar family.</p>
                    </div>
                    <button onClick={() => router.push('/admin')} style={{ padding: '10px 20px', background: 'none', border: '1px solid #8B0000', color: '#8B0000', borderRadius: '6px', cursor: 'pointer' }}>
                        Back to Dashboard
                    </button>
                </header>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '100px' }}>Loading customers...</div>
                ) : (
                    <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#8B0000', color: 'white' }}>
                                <tr>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Phone</th>
                                    <th style={{ padding: '15px', textAlign: 'left' }}>Member Since</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => (
                                    <tr key={customer.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '15px', fontWeight: 'bold' }}>{customer.displayName || 'Valued Guest'}</td>
                                        <td style={{ padding: '15px' }}>{customer.email || 'N/A'}</td>
                                        <td style={{ padding: '15px' }}>{customer.phoneNumber || 'N/A'}</td>
                                        <td style={{ padding: '15px', fontSize: '0.85rem', color: '#666' }}>
                                            {customer.createdAt?.toDate ? customer.createdAt.toDate().toLocaleDateString() : 'Earlier'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {customers.length === 0 && <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>No registered users yet.</div>}
                    </div>
                )}
            </div>
        </div>
    );
}
