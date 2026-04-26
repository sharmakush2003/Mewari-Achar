import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { emails } = await request.json();
        
        if (!emails || !Array.isArray(emails)) {
            return NextResponse.json({ error: 'Invalid email list' }, { status: 400 });
        }

        const emailUser = process.env.EMAIL_USER?.trim();
        const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s/g, '');

        if (!emailUser || !emailPass) {
            return NextResponse.json({ error: 'Email credentials not configured' }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { user: emailUser, pass: emailPass },
        });

        let sentCount = 0;
        let failedCount = 0;
        let errors = [];

        // We use a loop but you might want to throttle this for large lists
        for (const email of emails) {
            try {
                const mailOptions = {
                    from: `"Mewari Special Achaar" <${emailUser}>`,
                    to: email,
                    subject: "खम्मा घणी हुकुम! मेवाड़ की याद और यहाँ का स्वाद 🏰",
                    html: `
                        <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 2px solid #8B0000; border-radius: 12px; background-color: #fdfbf7;">
                            <div style="text-align: center; border-bottom: 1px solid #D4AF37; padding-bottom: 20px; margin-bottom: 20px;">
                                <h1 style="color: #8B0000; margin: 0;">मेवाड़ी अचार</h1>
                                <p style="color: #D4AF37; font-size: 0.9rem; letter-spacing: 3px; text-transform: uppercase; margin: 5px 0 0;">Authentic Taste of Rajasthan</p>
                            </div>
                            
                            <h2 style="color: #8B0000; text-align: center;">खम्मा घणी हुकुम!</h2>
                            
                            <p style="font-size: 1.1rem; line-height: 1.6; color: #333; text-align: center;">
                                उम्मीद है कि थारो चित्तौड़गढ़ रो सफ़र बहुत ही चोखो रयो हो सी। मेवाड़ री यादों सागे अठै रो स्वाद भी थारे घर तक पहुँच सके है।
                            </p>
                            
                            <p style="font-size: 1.1rem; line-height: 1.6; color: #333; text-align: center;">
                                <strong>मेवाड़ी स्पेशल अचार</strong> थारे घर तक वही हस्तनिर्मित और शुद्ध स्वाद पहुँचावेगा जो मेवाड़ री शान है।
                            </p>

                            <div style="text-align: center; margin: 40px 0;">
                                <a href="https://www.mewari-achar.shop/signup" style="background-color: #8B0000; color: white; padding: 15px 35px; text-decoration: none; border-radius: 5px; font-weight: bold; border: 2px solid #D4AF37;">Sign Up & Get Free Sample</a>
                            </div>

                            <p style="font-size: 0.9rem; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                                <br>
                                <strong>Vijay Laxmi Sharma</strong><br>
                                Mewari Special Achaar, Chittorgarh
                            </p>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                sentCount++;
                
                // Optional: Throttle to avoid being flagged as spam (1 sec per mail)
                // await new Promise(resolve => setTimeout(resolve, 1000));
                
            } catch (err) {
                failedCount++;
                errors.push(`${email}: ${err.message}`);
            }
        }

        return NextResponse.json({ 
            success: true, 
            sent: sentCount, 
            failed: failedCount,
            errors: errors
        });

    } catch (error) {
        console.error('[CAMPAIGN API] Critical Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
