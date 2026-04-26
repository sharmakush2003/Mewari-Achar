'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function CampaignPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [emails, setEmails] = useState('');
    const [subject, setSubject] = useState('खम्मा घणी हुकुम! मेवाड़ की याद और यहाँ का स्वाद 🏰');
    const [tagline, setTagline] = useState('Authentic Taste of Rajasthan');
    const [message, setMessage] = useState('उम्मीद है कि थारो चित्तौड़गढ़ रो सफ़र बहुत ही चोखो रयो हो सी। मेवाड़ री यादों सागे अठै रो स्वाद भी थारे घर तक पहुँच सके है। \n\nहुकुम, मेवाड़ी स्पेशल अचार थारे घर तक वही हस्तनिर्मित और शुद्ध स्वाद पहुँचावेगा जो मेवाड़ री शान है।');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);

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
                    tagline: tagline,
                    message: message.replace(/\n/g, '<br>')
                })
            });
            
            const data = await res.json();
            setResults(data);
            setStatus(`Campaign complete. Sent: ${data.sent}, Failed: ${data.failed}`);
        } catch (error) {
            console.error(error);
            setStatus("Campaign failed to start.");
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'serif', minHeight: '100vh', background: '#fdfbf7' }}>
            <h1 style={{ color: '#8B0000', textAlign: 'center' }}>🏰 Mewari Campaign Portal</h1>
            <p style={{ textAlign: 'center', opacity: 0.7 }}>Invite your Chittorgarh visitors with a personalized royal email.</p>
            
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
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Tagline (Header):</label>
                    <input 
                        type="text"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Message Body (Hindi/English):</label>
                    <textarea 
                        rows="6" 
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
                    {loading ? 'Sending Mails...' : '🚀 Launch Royal Campaign'}
                </button>
                
                {status && <div style={{ marginTop: '20px', padding: '15px', background: '#f8f5f0', borderRadius: '8px', color: '#8B0000', textAlign: 'center' }}>
                    {status}
                </div>}

                {results && (
                    <div style={{ marginTop: '20px', fontSize: '0.9rem' }}>
                        {results.errors?.length > 0 && (
                            <details>
                                <summary style={{ cursor: 'pointer', color: 'red' }}>View Errors ({results.errors.length})</summary>
                                <ul style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {results.errors.map((err, i) => <li key={i}>{err}</li>)}
                                </ul>
                            </details>
                        )}
                    </div>
                )}
            </div>
            
            <div style={{ marginTop: '40px', padding: '20px', background: '#fdf9f0', borderLeft: '5px solid #8B0000', borderRadius: '4px' }}>
                <h3 style={{ margin: 0 }}>Live Preview:</h3>
                <div style={{ marginTop: '10px', border: '1px solid #ddd', padding: '20px', background: 'white', borderRadius: '8px' }}>
                    <p style={{ fontWeight: 'bold', margin: 0, color: '#666' }}>Subject: {subject}</p>
                    <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #eee' }}/>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: '#8B0000', margin: '0 0 5px' }}>मेवाड़ी अचार</h2>
                        <p style={{ color: '#D4AF37', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', margin: '0 0 20px' }}>{tagline}</p>
                        <h3 style={{ color: '#8B0000' }}>खम्मा घणी हुकुम!</h3>
                        <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#333', whiteSpace: 'pre-wrap' }}>{message}</p>
                        <div style={{ marginTop: '30px' }}>
                            <span style={{ background: '#8B0000', color: 'white', padding: '10px 20px', borderRadius: '5px', fontSize: '0.9rem' }}>Sign Up & Get Free Sample</span>
                        </div>
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
