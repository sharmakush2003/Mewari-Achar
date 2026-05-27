'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPolicy() {
  const { language: initialLang } = useLanguage();
  const [lang, setLang] = useState('hi'); // Default to current site language or Hindi

  useEffect(() => {
    if (initialLang) {
      setLang(initialLang);
    }
  }, [initialLang]);

  const content = {
    en: {
      badge: "Security & Operations Policy",
      title: "Privacy Policy",
      lastUpdated: "Last Updated: May 27, 2026",
      backBtn: "Back to Home",
      toggleBtn: "View in Hindi (हिंदी में देखें)",
      
      sections: [
        {
          title: "1. Introduction & Scope",
          body: [
            "Welcome to <strong>Mewari Achaar</strong>. We are committed to protecting your personal information and your right to privacy. This policy applies to all information and operational transactions processed through our website (mewariachar.com) and our official mobile application on the Google Play Store (collectively, our <strong>\"Services\"</strong>).",
            "When you visit or use our Services, you trust us with your personal information. We take this trust very seriously and are dedicated to processing your data with absolute security, integrity, and transparency."
          ]
        },
        {
          title: "2. Information We Collect",
          body: [
            "To provide you with our premium homemade pickles and traditional Mewari service, we collect personal information that you voluntarily provide to us when you register, create an account, place an order, or contact us."
          ],
          grid: [
            {
              icon: "👤",
              title: "Account Credentials",
              desc: "Name, email address, password, and profile information during registration or social login (Google)."
            },
            {
              icon: "📞",
              title: "Contact Information",
              desc: "Phone number (primarily for WhatsApp delivery coordination and order confirmation alerts)."
            },
            {
              icon: "📍",
              title: "Delivery Address",
              desc: "Shipping details, state, district, city, house number, landmarks, and ZIP/PIN code for logistics."
            },
            {
              icon: "📱",
              title: "Device & Usage Information",
              desc: "Internet Protocol (IP) address, browser details, device characteristics, operating system, and language preferences collected automatically through cookies or analytics."
            }
          ]
        },
        {
          title: "3. How We Use Your Information",
          body: [
            "We process your personal information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent:"
          ],
          list: [
            "<strong>To Facilitate Account Creation & Authentication:</strong> We use your signup data to secure and maintain your royal member account.",
            "<strong>To Process and Deliver Orders:</strong> Your address and contact details are used to arrange shipping, manage delivery schedules, and send order tracking information.",
            "<strong>To Communicate via WhatsApp:</strong> Since we offer hand-crafted support, we coordinate delivery preferences, flavor profiles, and order receipts directly over WhatsApp.",
            "<strong>To Provide Customer Support:</strong> We resolve technical inquiries, order cancellations, and refunds efficiently.",
            "<strong>To Send Promotional Updates:</strong> With your explicit consent, we may send you notifications about new batches of pickles, special recipes, or royal member discounts."
          ]
        },
        {
          title: "4. Firebase Cloud Datastore & Security",
          body: [
            "Your privacy and data security are our highest priority. We store and manage your data securely using <strong>Google Firebase</strong> and <strong>Firestore Cloud Databases</strong>.",
            "Firebase is fully compliant with modern data protection standards. All user credentials and personal identifiers are securely encrypted both in transit and at rest. We implement robust technical and organizational security measures designed to protect your personal data from unauthorized access, loss, or alteration."
          ]
        },
        {
          title: "5. Third-Party Data Sharing",
          body: [
            "We do <strong>NOT</strong> sell, rent, trade, or share your personal data with third-party marketers or advertisers. We only share information with:",
            "<strong>Essential Service Providers:</strong> Logistics and courier partners who deliver your pickle jars safely to your doorstep.",
            "<strong>Cloud Infrastructure:</strong> Google Cloud Platform (Firebase) for secure database storage and authentication management.",
            "<strong>Legal Obligations:</strong> If required by law, court order, or government regulation, we may disclose information to protect public safety and legal rights."
          ]
        },
        {
          title: "6. Refund & Cancellation Policy",
          body: [
            "We strive to bring the authentic royal taste of Mewar to your home. Since our pickles are freshly handcrafted food products, we adhere to the following operational policies:"
          ],
          refunds: [
            {
              icon: "📦",
              title: "Returns Policy",
              desc: "We do not accept returns once the order is successfully delivered, given the perishable nature of homemade food items."
            },
            {
              icon: "💰",
              title: "Refunds Policy",
              desc: "Refunds are promptly processed if a product is unavailable, received in a damaged state upon delivery (photo proof required within 24 hours of delivery), or lost in transit."
            },
            {
              icon: "🚫",
              title: "Cancellations Policy",
              desc: "We reserve the right to cancel any order due to supply constraints or delivery area limitations. If canceled after payment, you will receive a full refund within 5 to 7 working days."
            }
          ]
        },
        {
          title: "7. Data Retention & Deletion Rights",
          body: [
            "We retain your personal information only for as long as is necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law."
          ],
          alert: {
            title: "🛡️ How to Delete Your Stored Personal Data",
            desc: "You have full authority over your data. If you wish to delete your account, wipe all personal identifiers, address details, or order logs from our database, you can initiate a deletion request instantly by sending an email to our data privacy officer at:",
            email: "mewariachar@gmail.com",
            footer: "All verified data deletion requests are permanently processed within <strong>24 to 48 hours</strong> from our production servers and Firebase datastores."
          }
        },
        {
          title: "8. Changes to This Policy",
          body: [
            "We may update this policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by an updated \"Last Updated\" date at the top of this page. We encourage you to review this policy periodically."
          ]
        },
        {
          title: "9. Contact & Corporate Identity",
          body: [
            "For questions, concerns, or deletion requests regarding this policy, please reach out to us at:"
          ],
          contact: {
            name: "Mewari Homemade Achaar",
            owner: "Vijay Laxmi Sharma",
            reg: "MSME Certified Enterprise",
            udyam: "UDYAM ID: UDYAM-RJ-10-0076393",
            email: "mewariachar@gmail.com",
            phone: "+91 70141 02742"
          }
        }
      ]
    },
    hi: {
      badge: "सुरक्षा एवं संचालन नीति",
      title: "गोपनीयता नीति (Privacy Policy)",
      lastUpdated: "अंतिम संशोधन: 27 मई, 2026",
      backBtn: "मुख्य पृष्ठ पर जाएं",
      toggleBtn: "View in English (अंग्रेजी में देखें)",
      
      sections: [
        {
          title: "1. प्रस्तावना और दायरा (Introduction & Scope)",
          body: [
            "<strong>मेवाड़ी अचार (Mewari Achaar)</strong> में आपका स्वागत है। हम आपकी व्यक्तिगत जानकारी और गोपनीयता की रक्षा करने के लिए पूरी तरह प्रतिबद्ध हैं। यह नीति हमारी वेबसाइट (mewariachar.com) और गूगल प्ले स्टोर पर हमारे आधिकारिक मोबाइल एप्लिकेशन (सामूहिक रूप से, हमारी <strong>\"सेवाएं\"</strong>) के माध्यम से संसाधित सभी जानकारियों और संचालन पर लागू होती है।",
            "जब आप हमारी सेवाओं का उपयोग करते हैं, तो आप अपनी व्यक्तिगत जानकारी के साथ हम पर भरोसा करते हैं। हम इस भरोसे को अत्यंत गंभीरता से लेते हैं और आपके डेटा को पूर्ण सुरक्षा, सत्यनिष्ठा और पारदर्शिता के साथ संसाधित करने के लिए समर्पित हैं।"
          ]
        },
        {
          title: "2. जानकारी जो हम एकत्र करते हैं (Information We Collect)",
          body: [
            "आपको हमारे प्रीमियम घरेलू अचार और पारंपरिक मेवाड़ी सेवा प्रदान करने के लिए, हम आपकी व्यक्तिगत जानकारी एकत्र करते हैं जिसे आप स्वेच्छा से खाता बनाते समय, ऑर्डर देते समय या हमसे संपर्क करते समय प्रदान करते हैं।"
          ],
          grid: [
            {
              icon: "👤",
              title: "खाता विवरण",
              desc: "पंजीकरण या सामाजिक लॉगिन (गूगल) के दौरान नाम, ईमेल पता, पासवर्ड और प्रोफाइल जानकारी।"
            },
            {
              icon: "📞",
              title: "संपर्क सूत्र",
              desc: "फोन नंबर (मुख्य रूप से व्हाट्सएप डिलीवरी समन्वय और ऑर्डर पुष्टिकरण अलर्ट के लिए)।"
            },
            {
              icon: "📍",
              title: "वितरण पता (Address)",
              desc: "शिपिंग विवरण, राज्य, जिला, शहर, मकान नंबर, लैंडमार्क और रसद (logistics) के लिए पिनकोड।"
            },
            {
              icon: "📱",
              title: "डिवाइस और उपयोग की जानकारी",
              desc: "आईपी पता, ब्राउज़र विवरण, डिवाइस की विशेषताएं, ऑपरेटिंग सिस्टम और भाषा प्राथमिकताएं जो कुकीज़ या एनालिटिक्स के माध्यम से स्वचालित रूप से एकत्र की जाती हैं।"
            }
          ]
        },
        {
          title: "3. हम आपकी जानकारी का उपयोग कैसे करते हैं (How We Use Your Information)",
          body: [
            "हम वैध व्यावसायिक हितों, आपके साथ हमारे अनुबंध की पूर्ति, हमारे कानूनी दायित्वों के अनुपालन और/या आपकी सहमति के आधार पर आपकी व्यक्तिगत जानकारी को संसाधित करते हैं:"
          ],
          list: [
            "<strong>खाता बनाने और प्रमाणीकरण की सुविधा के लिए:</strong> हम आपके लॉगिन विवरण का उपयोग आपके सदस्य खाते को सुरक्षित रखने के लिए करते हैं।",
            "<strong>ऑर्डर संसाधित करने और डिलीवर करने के लिए:</strong> आपके पते और संपर्क विवरण का उपयोग शिपिंग की व्यवस्था करने, डिलीवरी शेड्यूल प्रबंधित करने और ऑर्डर ट्रैकिंग भेजने के लिए किया जाता है।",
            "<strong>व्हाट्सएप के माध्यम से संचार करने के लिए:</strong> चूंकि हम हस्तनिर्मित सहायता प्रदान करते हैं, हम सीधे व्हाट्सएप पर डिलीवरी प्राथमिकताओं, स्वाद वरीयताओं और ऑर्डर रसीदों का समन्वय करते हैं।",
            "<strong>ग्राहक सहायता प्रदान करने के लिए:</strong> हम तकनीकी प्रश्नों, ऑर्डर रद्दीकरण और रिफंड का कुशलतापूर्वक समाधान करते हैं।",
            "<strong>प्रचार अपडेट भेजने के लिए:</strong> आपकी स्पष्ट सहमति से, हम आपको अचार के नए बैच, विशेष व्यंजनों या सदस्य छूट के बारे में सूचनाएं भेज सकते हैं।"
          ]
        },
        {
          title: "4. फायरबेस क्लाउड डेटास्टोर और सुरक्षा (Firebase Cloud Datastore & Security)",
          body: [
            "आपकी गोपनीयता और डेटा सुरक्षा हमारी सर्वोच्च प्राथमिकता है। हम <strong>Google Firebase</strong> और <strong>Firestore क्लाउड डेटाबेस</strong> का उपयोग करके आपके डेटा को सुरक्षित रूप से संग्रहीत और प्रबंधित करते हैं।",
            "फायरबेस आधुनिक डेटा सुरक्षा मानकों के साथ पूरी तरह से अनुपालन करता है। सभी उपयोगकर्ता क्रेडेंशियल और व्यक्तिगत पहचानकर्ता पारगमन (transit) और आराम (rest) दोनों में सुरक्षित रूप से एन्क्रिप्ट किए जाते हैं। हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए मजबूत सुरक्षा उपाय लागू करते हैं।"
          ]
        },
        {
          title: "5. तीसरे पक्ष के साथ डेटा साझा करना (Third-Party Data Sharing)",
          body: [
            "हम आपका व्यक्तिगत डेटा किसी तीसरे पक्ष के विपणक या विज्ञापनदाताओं को <strong>बेचते, किराए पर देते, व्यापार या साझा नहीं</strong> करते हैं। हम केवल निम्नलिखित के साथ जानकारी साझा करते हैं:",
            "<strong>आवश्यक सेवा प्रदाता:</strong> रसद और कूरियर भागीदार जो आपके अचार के जार को आपके घर तक सुरक्षित रूप से पहुंचाते हैं।",
            "<strong>क्लाउड इंफ्रास्ट्रक्चर:</strong> सुरक्षित डेटाबेस भंडारण और प्रमाणीकरण प्रबंधन के लिए गूगल क्लाउड प्लेटफॉर्म (फायरबेस)।",
            "<strong>कानूनी दायित्व:</strong> यदि कानून, अदालती आदेश या सरकारी विनियमन द्वारा आवश्यक हो, तो हम कानूनी अधिकारों की रक्षा के लिए जानकारी का खुलासा कर सकते हैं।"
          ]
        },
        {
          title: "6. वापसी एवं रद्दीकरण नीति (Refund & Cancellation Policy)",
          body: [
            "हम मेवाड़ का असली रजवाड़ी स्वाद आपके घर तक पहुंचाने का प्रयास करते हैं। चूंकि हमारे अचार ताजे और हस्तनिर्मित खाद्य उत्पाद हैं, इसलिए हम निम्नलिखित नीतियों का पालन करते हैं:"
          ],
          refunds: [
            {
              icon: "📦",
              title: "वापसी नीति (Returns Policy)",
              desc: "ऑर्डर सफलतापूर्वक वितरित होने के बाद हम रिटर्न स्वीकार नहीं करते हैं, क्योंकि यह घरेलू और खराब होने वाले खाद्य उत्पाद हैं।"
            },
            {
              icon: "💰",
              title: "रिफंड नीति (Refunds Policy)",
              desc: "यदि उत्पाद अनुपलब्ध है, पारगमन में खो जाता है, या डिलीवरी पर क्षतिग्रस्त मिलता है (डिलीवरी के 24 घंटे के भीतर फोटो प्रमाण आवश्यक है), तो रिफंड तुरंत संसाधित किया जाता है।"
            },
            {
              icon: "🚫",
              title: "रद्दीकरण नीति (Cancellations Policy)",
              desc: "हम आपूर्ति सीमाओं या डिलीवरी क्षेत्र की सीमाओं के कारण किसी भी ऑर्डर को रद्द करने का अधिकार सुरक्षित रखते हैं। भुगतान के बाद रद्द होने पर, आपको 5 से 7 कार्य दिवसों में पूर्ण रिफंड मिल जाएगा।"
            }
          ]
        },
        {
          title: "7. डेटा प्रतिधारण और हटाने के अधिकार (Data Retention & Deletion Rights)",
          body: [
            "हम आपकी व्यक्तिगत जानकारी को केवल तब तक सुरक्षित रखते हैं जब तक इस नीति में उल्लिखित उद्देश्यों को पूरा करने के लिए आवश्यक हो।"
          ],
          alert: {
            title: "🛡️ अपने संग्रहीत व्यक्तिगत डेटा को कैसे हटाएं",
            desc: "आपके पास अपने डेटा पर पूर्ण नियंत्रण है। यदि आप अपना खाता हटाना चाहते हैं, या हमारे डेटाबेस से अपनी व्यक्तिगत जानकारी, पते के विवरण या ऑर्डर लॉग मिटाना चाहते हैं, तो आप सीधे हमारे डेटा गोपनीयता अधिकारी को ईमेल भेजकर हटाने का अनुरोध कर सकते हैं:",
            email: "mewariachar@gmail.com",
            footer: "सभी सत्यापित डेटा हटाने के अनुरोध स्थायी रूप से हमारे उत्पादन सर्वर और फायरबेस डेटास्टोर से <strong>24 से 48 घंटों</strong> के भीतर संसाधित किए जाते हैं।"
          }
        },
        {
          title: "8. इस नीति में बदलाव (Changes to This Policy)",
          body: [
            "हम समय-समय पर इस नीति को अपडेट कर सकते हैं। संशोधित संस्करण को इस पृष्ठ के शीर्ष पर \"अंतिम संशोधन\" तिथि द्वारा दर्शाया जाएगा। हम आपको समय-समय पर इस नीति की समीक्षा करने के लिए प्रोत्साहित करते हैं।"
          ]
        },
        {
          title: "9. संपर्क और कॉर्पोरेट पहचान (Contact & Corporate Identity)",
          body: [
            "इस नीति से संबंधित प्रश्नों, चिंताओं या डेटा हटाने के अनुरोधों के लिए, कृपया हमसे यहाँ संपर्क करें:"
          ],
          contact: {
            name: "मेवाड़ी होममेड अचार (Mewari Homemade Achaar)",
            owner: "विजय लक्ष्मी शर्मा (Vijay Laxmi Sharma)",
            reg: "MSME प्रमाणित उद्यम",
            udyam: "UDYAM ID: UDYAM-RJ-10-0076393",
            email: "mewariachar@gmail.com",
            phone: "+91 70141 02742"
          }
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <div className="policy-page-wrapper">
      <div className="decor-glow"></div>
      
      {/* Premium Elegant Header */}
      <header className="policy-header">
        <Link href="/" className="back-home-btn">
          <i className="fas fa-arrow-left"></i> {t.backBtn}
        </Link>
        <button className="lang-switcher-btn" onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}>
          <i className="fas fa-globe"></i> {t.toggleBtn}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="policy-container">
        <div className="policy-card">
          <div className="policy-card-header">
            <span className="badge-royal">{t.badge}</span>
            <h2 className="section-title">{t.title}</h2>
            <p className="last-updated">{t.lastUpdated}</p>
            <div className="header-divider"></div>
          </div>

          <div className="policy-body">
            {t.sections.map((section, idx) => (
              <section key={idx} className={`policy-section ${idx === t.sections.length - 1 ? 'last' : ''}`}>
                <h3>{section.title}</h3>
                
                {section.body.map((pText, pIdx) => (
                  <p key={pIdx} dangerouslySetInnerHTML={{ __html: pText }}></p>
                ))}

                {/* Grid data if available */}
                {section.grid && (
                  <div className="data-grid">
                    {section.grid.map((box, bIdx) => (
                      <div key={bIdx} className="data-box">
                        <span className="icon">{box.icon}</span>
                        <h4>{box.title}</h4>
                        <p>{box.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* List data if available */}
                {section.list && (
                  <ul>
                    {section.list.map((liText, lIdx) => (
                      <li key={lIdx} dangerouslySetInnerHTML={{ __html: liText }}></li>
                    ))}
                  </ul>
                )}

                {/* Refund lists if available */}
                {section.refunds && (
                  <div className="refund-cards">
                    {section.refunds.map((card, rIdx) => (
                      <div key={rIdx} className="refund-card-item">
                        <span className="badge-icon">{card.icon}</span>
                        <div className="card-txt">
                          <h4>{card.title}</h4>
                          <p>{card.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Alert Deletion box */}
                {section.alert && (
                  <div className="alert-badge-box">
                    <h4>{section.alert.title}</h4>
                    <p>{section.alert.desc}</p>
                    <div className="email-highlight">
                      <a href={`mailto:${section.alert.email}`}>{section.alert.email}</a>
                    </div>
                    <p style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.9 }} dangerouslySetInnerHTML={{ __html: section.alert.footer }}></p>
                  </div>
                )}

                {/* Contact card detail */}
                {section.contact && (
                  <div className="contact-card">
                    <h5>{section.contact.name}</h5>
                    <p><strong>Owner:</strong> {section.contact.owner}</p>
                    <p><strong>Corporate Registration:</strong> {section.contact.reg}</p>
                    <p><strong>{section.contact.udyam}</strong></p>
                    <p><strong>Email:</strong> <a href={`mailto:${section.contact.email}`}>{section.contact.email}</a></p>
                    <p><strong>WhatsApp Support:</strong> {section.contact.phone}</p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>

      <footer className="policy-footer">
        <p>© 2026 Mewari Homemade Achaar. All Rights Reserved.</p>
        <p className="dev-credit">Developed & Maintained by <a href="https://chittortech.online" target="_blank" rel="noopener noreferrer">ChittorTech</a></p>
      </footer>

      {/* Premium Styling tailored specifically for Web-Wow Aesthetic */}
      <style jsx>{`
        .policy-page-wrapper {
          min-height: 100vh;
          background-color: #faf9f2;
          color: #2c1810;
          font-family: var(--font-main), 'Outfit', sans-serif;
          position: relative;
          overflow-x: hidden;
          padding-bottom: 50px;
        }

        .decor-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
          top: -200px;
          right: -200px;
          z-index: 0;
          pointer-events: none;
        }

        .policy-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 8%;
          background: #ffffff;
          border-bottom: 1px solid rgba(139, 0, 0, 0.08);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .back-home-btn {
          color: #8B0000;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px solid rgba(139, 0, 0, 0.15);
          border-radius: 30px;
          transition: all 0.3s ease;
          background: transparent;
        }

        .back-home-btn:hover {
          background: rgba(139, 0, 0, 0.04);
          transform: translateX(-3px);
          border-color: #8B0000;
        }

        .lang-switcher-btn {
          background: rgba(139, 0, 0, 0.05);
          border: 1px solid #D4AF37;
          color: #8B0000;
          padding: 8px 16px;
          border-radius: 30px;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .lang-switcher-btn:hover {
          background: rgba(139, 0, 0, 0.1);
          transform: scale(1.02);
        }

        .policy-container {
          max-width: 900px;
          margin: 50px auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .policy-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 20px 50px rgba(44, 24, 16, 0.05);
          padding: 50px 6%;
          position: relative;
        }

        .policy-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #8B0000 0%, #D4AF37 50%, #8B0000 100%);
          border-radius: 24px 24px 0 0;
        }

        .policy-card-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .badge-royal {
          background: rgba(212, 175, 55, 0.1);
          color: #C5A028;
          border: 1.5px solid rgba(212, 175, 55, 0.35);
          padding: 6px 18px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 15px;
        }

        .section-title {
          font-family: var(--font-heading), 'Playfair Display', serif;
          font-size: 2.5rem;
          color: #2c1810;
          margin: 0 0 10px 0;
          font-weight: 700;
        }

        .last-updated {
          font-size: 0.85rem;
          color: #5a4a42;
          opacity: 0.65;
          margin: 0;
        }

        .header-divider {
          width: 80px;
          height: 3px;
          background-color: #D4AF37;
          margin: 25px auto 0;
          border-radius: 10px;
        }

        .policy-body {
          line-height: 1.8;
          font-size: 0.95rem;
          color: #4a3d36;
        }

        .policy-section {
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(139, 0, 0, 0.05);
          padding-bottom: 30px;
        }

        .policy-section.last {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }

        .policy-section h3 {
          font-family: var(--font-heading), 'Playfair Display', serif;
          color: #8B0000;
          font-size: 1.35rem;
          margin-top: 0;
          margin-bottom: 18px;
          font-weight: 700;
        }

        .policy-section p {
          margin: 0 0 15px 0;
          opacity: 0.9;
        }

        .policy-section a {
          color: #8B0000;
          text-decoration: underline;
          font-weight: 600;
          word-break: break-all;
        }

        .policy-section a:hover {
          color: #D4AF37;
        }

        .policy-section ul {
          margin: 0 0 20px 20px;
          padding: 0;
          list-style-type: square;
          opacity: 0.95;
        }

        .policy-section li {
          margin-bottom: 8px;
        }

        .data-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 25px;
        }

        .data-box {
          background: rgba(212, 175, 55, 0.04);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
        }

        .data-box:hover {
          background: rgba(212, 175, 55, 0.08);
          transform: translateY(-2px);
          border-color: #D4AF37;
        }

        .data-box .icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 12px;
        }

        .data-box h4 {
          color: #8B0000;
          margin: 0 0 8px 0;
          font-size: 1.05rem;
          font-weight: 700;
        }

        .data-box p {
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.5;
          opacity: 0.85;
        }

        /* Refund Card Items */
        .refund-cards {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
        }

        .refund-card-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
          background: rgba(212, 175, 55, 0.04);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 16px;
          padding: 20px;
        }

        .refund-card-item .badge-icon {
          font-size: 1.6rem;
          background: #ffffff;
          padding: 8px;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.2);
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        .card-txt h4 {
          margin: 0 0 4px 0;
          color: #8B0000;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .card-txt p {
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.5;
          opacity: 0.85;
        }

        .alert-badge-box {
          background: rgba(139, 0, 0, 0.03);
          border-left: 4px solid #8B0000;
          border-radius: 0 16px 16px 0;
          padding: 25px;
          margin: 25px 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        .alert-badge-box h4 {
          margin: 0 0 10px 0;
          color: #8B0000;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .alert-badge-box p {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.6;
          word-break: break-word;
        }

        .email-highlight {
          margin: 15px 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          padding: 8px 24px;
          border-radius: 30px;
          border: 1px solid rgba(139, 0, 0, 0.2);
          box-shadow: 0 4px 10px rgba(139,0,0,0.04);
          max-width: 100%;
          box-sizing: border-box;
        }

        .email-highlight a {
          color: #8B0000 !important;
          text-decoration: none !important;
          font-size: 1.05rem;
          letter-spacing: 0.5px;
          font-weight: 700;
          word-break: break-all;
          overflow-wrap: break-word;
        }

        .email-highlight:hover {
          border-color: #8B0000;
          background: rgba(139, 0, 0, 0.02);
        }

        .contact-card {
          background: #faf9f2;
          border: 1px solid rgba(44, 24, 16, 0.08);
          border-radius: 16px;
          padding: 25px;
          margin-top: 20px;
        }

        .contact-card h5 {
          color: #8B0000;
          margin: 0 0 12px 0;
          font-size: 1.15rem;
          font-weight: 800;
          font-family: var(--font-heading), 'Playfair Display', serif;
        }

        .contact-card p {
          margin: 0 0 6px 0;
          font-size: 0.9rem;
          opacity: 0.95;
          word-break: break-word;
        }

        .contact-card p strong {
          color: #2c1810;
        }

        .policy-footer {
          text-align: center;
          margin-top: 40px;
          font-size: 0.8rem;
          color: #5a4a42;
          opacity: 0.6;
        }

        .policy-footer p {
          margin: 4px 0;
        }

        .dev-credit a {
          color: #5a4a42;
          text-decoration: none;
          font-weight: 600;
        }

        .dev-credit a:hover {
          color: #8B0000;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .policy-header {
            padding: 15px 5%;
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .policy-container {
            margin: 20px auto;
            padding: 0 10px;
          }

          .policy-card {
            padding: 30px 15px;
            border-radius: 18px;
          }

          .data-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .email-highlight {
            padding: 8px 15px;
          }
          
          .email-highlight a {
            font-size: 0.9rem;
          }

          .refund-card-item {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
