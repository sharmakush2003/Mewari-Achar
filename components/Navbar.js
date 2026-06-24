'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar({ onOpenOrders, onOpenSample }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sync scroll lock
  useEffect(() => {
    if (mounted) {
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    }
    return () => { if (typeof document !== 'undefined') document.body.style.overflow = ''; };
  }, [menuOpen, mounted]);

  const navItems = [
    { name: t('home'), href: '/', icon: '🏠' },
    { name: t('collection'), href: '/collection', icon: '🍯' },
    { name: t('shop'), href: 'https://wa.me/c/917014102742', icon: '💬' },
    { name: t('pairingGuide'), href: '/pairing-guide', icon: '📜' },
  ];

  return (
    <>
      {/* Top Pink Marquee */}
      <div 
        className="marquee-container"
        style={{ 
          background: '#e972ab', // JhaJi Pink
          color: 'white', 
          padding: '8px 0', 
          fontSize: '0.85rem',
          display: menuOpen ? 'none' : 'block',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="marquee-content">
          Maa ke Haath — Meet the mothers behind your pickle. → &nbsp;&nbsp;&nbsp;&nbsp; Maa ke Haath — Meet the mothers behind your pickle. → &nbsp;&nbsp;&nbsp;&nbsp; Maa ke Haath — Meet the mothers behind your pickle. →
        </div>
      </div>

      <nav className={`mewari-nav-fixed ${scrolled ? 'is-scrolled' : ''}`} style={{ display: menuOpen ? 'none' : 'flex' }}>
        <div className="mewari-nav-container">
          <Link href="/" className="mewari-logo-link" onClick={() => setMenuOpen(false)}>
            <img src="/favicon.png" alt="Mewari Achaar" style={{ 
              height: '55px', 
              width: 'auto', 
              position: 'relative', 
              transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
              zIndex: 100
            }} />
          </Link>

          <div className="mobile-center-title">
            Mewari <br/> Achaar
          </div>

          <ul className="mewari-desktop-nav">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith('http');
              return (
                <li key={item.name}>
                  {isExternal ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="mewari-nav-item" style={{ textDecoration: 'none' }}>
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </a>
                  ) : (
                    <Link href={item.href} className="mewari-nav-item">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
            
            {mounted && (
              <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button 
                  onClick={toggleLanguage}
                  className="lang-toggle-btn"
                  style={{
                    background: 'rgba(139, 0, 0, 0.05)',
                    border: '1px solid #D4AF37',
                    color: '#8B0000',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    transition: '0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <i className="fas fa-globe"></i> {language === 'hi' ? 'EN' : 'HI'}
                </button>
                {!user ? (
                  <Link href="/login" className="drawer-action-btn" style={{ padding: '10px 25px', fontSize: '0.85rem', borderRadius: '8px' }}>Login</Link>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={logout} style={{ background: 'none', border: '1px solid #8B0000', color: '#8B0000', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600' }}>Logout</button>
                  </div>
                )}
              </li>
            )}
          </ul>

          <div className="nav-hamburger-wrapper">
            <button className="mewari-hamburger" onClick={() => setMenuOpen(true)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* DRAWER */}
      {menuOpen && (
        <div className="mewari-mobile-drawer">
          <div className="drawer-header" style={{ marginBottom: '1rem' }}>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <img src="/favicon.png" alt="Logo" style={{ height: '60px' }} />
            </Link>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#8B0000', fontSize: '2.5rem', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
          </div>

          <div className="drawer-footer-profile" style={{ marginTop: 0, borderTop: 'none', paddingTop: 0, marginBottom: '2rem', borderBottom: '1px solid rgba(139, 0, 0, 0.1)', paddingBottom: '1.5rem' }}>
            {mounted && (
              <>
                {!user ? (
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="drawer-action-btn">
                    {t('loginRegister')}
                  </Link>
                ) : (
                  <>
                    <div className="drawer-profile-info">
                      <div className="drawer-avatar-circle">👤</div>
                      <div className="drawer-user-details">
                        <h4>{(() => {
                          const rawName = user.displayName;
                          if (!rawName || rawName === 'Valued Guest' || rawName === 'Guest') {
                            const emailPrefix = user.email?.split('@')[0] || '';
                            return `${t('hukum')} ${emailPrefix.split(/[._]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}`;
                          }
                          return `${t('hukum')} ${rawName}`;
                        })()}</h4>
                        <span>{t('registeredMember')}</span>
                      </div>
                    </div>

                    <button onClick={logout} className="drawer-action-btn drawer-logout-btn">
                      {t('logout')}
                    </button>
                  </> 
                )}
              </>
            )}
          </div>

          <div className="drawer-links-box">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith('http');
              return isExternal ? (
                <a 
                  key={item.name} 
                  href={item.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)} 
                  className="drawer-link-item" 
                  style={{ padding: '8px 0', textDecoration: 'none' }}
                >
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
                </a>
              ) : (
                <Link key={item.name} href={item.href} onClick={() => setMenuOpen(false)} className="drawer-link-item" style={{ padding: '8px 0' }}>
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
                </Link>
              );
            })}
            
            <button 
              onClick={toggleLanguage}
              className="drawer-link-item"
              style={{ 
                padding: '12px 0', 
                background: 'none', 
                border: 'none', 
                width: '100%', 
                textAlign: 'left',
                borderTop: '1px solid rgba(139, 0, 0, 0.1)',
                marginTop: '10px'
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>🌐</span>
              <span style={{ fontSize: '0.95rem' }}>{t('changeLanguage')} ({language === 'hi' ? 'English' : 'Hindi'})</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
