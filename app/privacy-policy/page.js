'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function LegalPage() {
    const { t } = useLanguage();

    return (
        <main className="main-wrapper">
            <Navbar />
            
            <section className="royal-section" style={{ paddingTop: '120px', paddingBottom: '40px' }}>
                <div className="section-header">
                    <span className="section-label">{t('trustTransparency')}</span>
                    <h1 className="section-display">{t('legalPolicies')}</h1>
                </div>
            </section>

            <section className="royal-section alt-cream" style={{ paddingBottom: '80px' }}>
                <div className="policy-container">
                    
                    {/* PRIVACY POLICY */}
                    <div className="policy-group">
                        <h2 className="policy-main-title">{t('privacyPolicy')}</h2>
                        <div className="policy-card">
                            <h3><i className="fas fa-shield-alt"></i> {t('introScopeTitle')}</h3>
                            <p>{t('introScopeP1')}</p>
                            <p>{t('introScopeP2')}</p>
                        </div>
                        <div className="policy-card">
                            <h3><i className="fas fa-user-shield"></i> {t('infoCollectTitle')}</h3>
                            <p>{t('infoCollectP')}</p>
                            <ul>
                                <li>{t('infoAccount')}</li>
                                <li>{t('infoContact')}</li>
                                <li>{t('infoDelivery')}</li>
                            </ul>
                        </div>
                        <div className="policy-card">
                            <h3><i className="fas fa-server"></i> {t('dataSecTitle')}</h3>
                            <p>{t('dataSecP')}</p>
                        </div>
                        <div className="policy-card">
                            <h3><i className="fas fa-handshake-slash"></i> {t('thirdPartyTitle')}</h3>
                            <p>{t('thirdPartyP')}</p>
                        </div>
                        <div className="policy-card">
                            <h3><i className="fas fa-certificate"></i> {t('fssaiRegistrationTitle')}</h3>
                            <p dangerouslySetInnerHTML={{ __html: t('fssaiRegistrationP') }}></p>
                        </div>
                    </div>

                    {/* TERMS OF SERVICE */}
                    <div className="policy-group">
                        <h2 className="policy-main-title">{t('termsConditions')}</h2>
                        <div className="policy-card">
                            <h3><i className="fas fa-file-contract"></i> {t('termsServiceTitle')}</h3>
                            <p>{t('termsServiceP')}</p>
                        </div>
                        <div className="policy-card">
                            <h3><i className="fas fa-star"></i> {t('premiumQualityTitle')}</h3>
                            <p>{t('premiumQualityP')}</p>
                        </div>
                        <div className="policy-card">
                            <h3><i className="fas fa-leaf"></i> {t('naturalVariationsTitle')}</h3>
                            <p>{t('naturalVariationsP')}</p>
                        </div>
                    </div>

                    {/* SHIPPING POLICY */}
                    <div className="policy-group">
                        <h2 className="policy-main-title">{t('shippingPolicy')}</h2>
                        <div className="policy-card">
                            <h3><i className="fas fa-shipping-fast"></i> {t('deliveryNetworkTitle')}</h3>
                            <p>{t('deliveryNetworkP')}</p>
                            <ul>
                                <li>{t('deliveryStandard')}</li>
                                <li>{t('deliveryRemote')}</li>
                            </ul>
                        </div>
                        <div className="policy-card">
                            <h3><i className="fab fa-whatsapp"></i> {t('whatsappCoordTitle')}</h3>
                            <p>{t('whatsappCoordP')}</p>
                        </div>
                    </div>

                    {/* REFUND POLICY */}
                    <div className="policy-group">
                        <h2 className="policy-main-title">{t('refundCancellation')}</h2>
                        <div className="policy-card">
                            <h3><i className="fas fa-undo"></i> {t('returnsPolicyTitle')}</h3>
                            <p>{t('returnsPolicyP')}</p>
                        </div>
                        <div className="policy-card">
                            <h3><i className="fas fa-hand-holding-usd"></i> {t('refundsPolicyTitle')}</h3>
                            <p>{t('refundsPolicyP')}</p>
                            <ul>
                                <li>{t('refundsProof')}</li>
                            </ul>
                        </div>
                        <div className="policy-card">
                            <h3><i className="fas fa-times-circle"></i> {t('cancellationsPolicyTitle')}</h3>
                            <p>{t('cancellationsPolicyP')}</p>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />

            <style jsx>{`
                .policy-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 0 5%;
                }
                .policy-group {
                    margin-bottom: 60px;
                }
                .policy-main-title {
                    font-family: 'Poppins', sans-serif;
                    font-size: 2rem;
                    color: #8B0000;
                    border-bottom: 2px solid #E5D3A2;
                    padding-bottom: 10px;
                    margin-bottom: 30px;
                }
                .policy-card {
                    background: #ffffff;
                    border: 1px solid #eeeeee;
                    border-radius: 8px;
                    padding: 25px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
                }
                .policy-card h3 {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.2rem;
                    color: #222;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .policy-card h3 i {
                    color: #D4AF37;
                }
                .policy-card p {
                    font-family: 'Quicksand', sans-serif;
                    color: #555;
                    line-height: 1.6;
                    margin-bottom: 10px;
                }
                .policy-card ul {
                    margin-top: 10px;
                    padding-left: 20px;
                }
                .policy-card li {
                    font-family: 'Quicksand', sans-serif;
                    color: #555;
                    line-height: 1.6;
                    margin-bottom: 5px;
                }
            `}</style>
        </main>
    );
}
