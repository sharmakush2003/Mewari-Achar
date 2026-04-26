'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function CampaignPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [emails, setEmails] = useState('');
    const [subject, setSubject] = useState('Exquisite Mewari Pickles: A Taste of Chittorgarh\'s Heritage 🏰');
    const [message, setMessage] = useState('Experience the artisanal essence of Rajasthan.\n\nDirectly from the historic heart of Chittorgarh, Mewari Achaar brings you a refined collection of traditional handcrafted pickles. Each jar is a labor of love, prepared with sun-dried spices and age-old family recipes that have defined the culinary heritage of our region.\n\nWe invite you to discover our premium selection and bring the authentic spirit of Mewar to your dining table. Explore our boutique collection at https://www.mewari-achar.shop/.\n\nExclusive Tasting: To experience our signature flavors, you may request a sample through our website or WhatsApp. Standard delivery charges applicable. We take pride in our craft and are certain that one taste will leave a lasting impression of quality and tradition.\n\nWith the highest regards,\nMarketing & Quality Assurance Team\nMewari Achaar, Chittorgarh');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [totalStats, setTotalStats] = useState({ sent: 0, failed: 0 });

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
        }

        // Fetch campaign stats
        const fetchStats = async () => {
            try {
                const { db } = await import('@/lib/firebase');
                const { doc, getDoc } = await import('firebase/firestore');
                const statsRef = doc(db, 'stats', 'campaigns');
                const statsSnap = await getDoc(statsRef);
                if (statsSnap.exists()) {
                    setTotalStats(statsSnap.data());
                }
            } catch (err) {
                console.error("Error fetching campaign stats:", err);
            }
        };
        fetchStats();
    }, [user, authLoading, router]);

    if (authLoading || user?.email?.toLowerCase().trim() !== 'kushsharma.cor@gmail.com') {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdfbf7', color: '#8B0000', fontFamily: 'serif' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏰</div>
                <h2>Verifying Royal Access...</h2>
            </div>
        </div>;
    }

    const handleSend = async () => {
        if (!emails.trim()) return alert("Hukum, please provide the email list.");
        if (!subject.trim()) return alert("Hukum, please provide an email subject.");
        if (!message.trim()) return alert("Hukum, please provide the message body.");
        
        setLoading(true);
        setStatus("Preparing the royal mail queue...");
        
        const emailList = emails.split(/[\n,]+/).map(e => e.trim()).filter(e => e.includes('@'));
        
        if (emailList.length === 0) {
            setLoading(false);
            return alert("No valid emails found.");
        }

        try {
            const res = await fetch('/api/admin/send-campaign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    emails: emailList,
                    subject: subject,
                    message: message
                })
            });
            
            const data = await res.json();
            setResults(data);
            setStatus(`Campaign complete. Sent: ${data.sent}, Failed: ${data.failed}`);

            // Update stats in Firestore
            const { db } = await import('@/lib/firebase');
            const { doc, setDoc, increment } = await import('firebase/firestore');
            const statsRef = doc(db, 'stats', 'campaigns');
            await setDoc(statsRef, {
                sent: increment(data.sent || 0),
                failed: increment(data.failed || 0)
            }, { merge: true });

            // Refresh local stats
            setTotalStats(prev => ({
                sent: prev.sent + (data.sent || 0),
                failed: prev.failed + (data.failed || 0)
            }));

        } catch (error) {
            console.error(error);
            setStatus("Campaign failed to start.");
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'serif', minHeight: '100vh', background: '#fdfbf7' }}>
            <h1 style={{ color: '#8B0000', textAlign: 'center' }}>🏰 Mewari Campaign Portal</h1>
            <p style={{ textAlign: 'center', opacity: 0.7 }}>Elite Brand Experience for your Chittorgarh visitors.</p>
            
            <div style={{ marginTop: '30px', background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #D4AF37', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Subject:</label>
                    <input 
                        type="text"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Message Body (Elite English):</label>
                    <textarea 
                        rows="10" 
                        style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'inherit', fontSize: '1rem' }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Recipient Email List:</label>
                    <textarea 
                        rows="5" 
                        style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
                        placeholder="example1@gmail.com, example2@gmail.com..."
                        value={emails}
                        onChange={(e) => setEmails(e.target.value)}
                    />
                </div>
                
                <button 
                    onClick={handleSend}
                    disabled={loading}
                    style={{ 
                        marginTop: '10px', 
                        width: '100%', 
                        padding: '15px', 
                        background: '#8B0000', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: 'bold'
                    }}
                >
                    {loading ? 'Launching Elite Campaign...' : '🚀 Launch Elite Campaign'}
                </button>
                
                {status && <div style={{ marginTop: '20px', padding: '15px', background: '#f8f5f0', borderRadius: '8px', color: '#8B0000', textAlign: 'center' }}>
                    {status}
                </div>}

                <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Total Sent</p>
                        <h3 style={{ margin: '5px 0 0', color: '#2e7d32', fontSize: '1.5rem' }}>{totalStats.sent}</h3>
                    </div>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Total Failed</p>
                        <h3 style={{ margin: '5px 0 0', color: '#d32f2f', fontSize: '1.5rem' }}>{totalStats.failed}</h3>
                    </div>
                </div>
            </div>
            
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button onClick={() => router.push('/admin')} style={{ background: 'none', border: 'none', color: '#8B0000', cursor: 'pointer', textDecoration: 'underline' }}>
                    Back to Admin Dashboard
                </button>
            </div>
        </div>
    );
}
