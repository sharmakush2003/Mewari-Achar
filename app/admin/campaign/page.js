'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';

export default function CampaignPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [emails, setEmails] = useState('');
    const [subject, setSubject] = useState('शानदार मेवाड़ी अचार: चित्तौड़गढ़ की विरासत का स्वाद 🍯');
    const [message, setMessage] = useState('राजस्थान के पारंपरिक स्वाद का अनुभव करें।\n\nसीधे चित्तौड़गढ़ के ऐतिहासिक हृदय से, मेवाड़ी अचार आपके लिए पारंपरिक हस्तनिर्मित अचारों का एक बेहतरीन संग्रह लेकर आया है। प्रत्येक जार प्यार और कड़ी मेहनत का परिणाम है, जिसे धूप में सुखाए गए मसालों और पीढ़ियों पुरानी पारिवारिक रेसिपी के साथ तैयार किया गया है, जो हमारे क्षेत्र की पाक विरासत को परिभाषित करती हैं।\n\nहम आपको हमारे प्रीमियम संग्रह को देखने और अपने भोजन की मेज पर मेवाड़ की प्रामाणिक भावना लाने के लिए आमंत्रित करते हैं। हमारे बुटीक संग्रह को यहाँ देखें: https://www.mewari-achar.shop/\n\nविशेष स्वाद चखना: हमारे खास स्वादों का अनुभव करने के लिए, आप हमारी वेबसाइट या व्हाट्सएप के माध्यम से सैंपल का अनुरोध कर सकते हैं। मानक डिलीवरी शुल्क लागू होंगे। हमें अपने शिल्प पर गर्व है और हमें यकीन है कि एक बार चखने के बाद आप गुणवत्ता और परंपरा की एक अमिट छाप पाएंगे।\n\nससम्मान,\nमार्केटिंग और गुणवत्ता आश्वासन टीम\nमेवाड़ी अचार, चित्तौड़गढ़');
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
        return <div style={{ minHeight: '100vh', background: '#fdfbf7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B0000', fontFamily: 'serif' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🏰</div>
                <h2>शाही पहुँच की पुष्टि की जा रही है...</h2>
            </div>
        </div>;
    }

    const handleSend = async () => {
        if (!emails.trim()) return alert("हुकुम, कृपया ईमेल सूची प्रदान करें।");
        if (!subject.trim()) return alert("हुकुम, कृपया ईमेल का विषय प्रदान करें।");
        if (!message.trim()) return alert("हुकुम, कृपया संदेश का मुख्य भाग प्रदान करें।");
        
        setLoading(true);
        setStatus("शाही मेल कतार तैयार की जा रही है...");
        
        const emailList = emails.split(/[,\n\r\s;]+/).map(e => e.trim()).filter(e => e.includes('@'));
        
        if (emailList.length === 0) {
            setLoading(false);
            return alert("कोई वैध ईमेल नहीं मिला।");
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
            setStatus(`अभियान पूरा हुआ। भेजे गए: ${data.sent}, असफल: ${data.failed}`);
        } catch (error) {
            console.error(error);
            setStatus("अभियान शुरू करने में विफल।");
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'serif', minHeight: '100vh', background: '#fdfbf7' }}>
            <h1 style={{ color: '#8B0000', textAlign: 'center' }}>🏰 मेवाड़ी अभियान पोर्टल</h1>
            <p style={{ textAlign: 'center', opacity: 0.7 }}>आपके चित्तौड़गढ़ आने वाले मेहमानों के लिए उत्कृष्ट ब्रांड अनुभव।</p>
            
            <div style={{ marginTop: '30px', background: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #D4AF37', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ईमेल का विषय:</label>
                    <input 
                        type="text"
                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>संदेश का मुख्य भाग (हिंदी):</label>
                    <textarea 
                        rows="12" 
                        style={{ width: '100%', padding: '15px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'inherit', fontSize: '1rem', lineHeight: '1.6' }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ईमेल प्राप्तकर्ताओं की सूची:</label>
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
                    {loading ? 'उत्कृष्ट अभियान शुरू किया जा रहा है...' : '🚀 उत्कृष्ट अभियान शुरू करें'}
                </button>
                
                {status && <div style={{ marginTop: '20px', padding: '15px', background: '#f8f5f0', borderRadius: '8px', color: '#8B0000', textAlign: 'center' }}>
                    {status}
                </div>}

                </div>

            
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button onClick={() => router.push('/admin')} style={{ background: 'none', border: 'none', color: '#8B0000', cursor: 'pointer', textDecoration: 'underline' }}>
                    एडमिन डैशबोर्ड पर वापस जाएं
                </button>
            </div>
        </div>
    );
}
