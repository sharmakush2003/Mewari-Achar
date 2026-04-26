import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { emails, subject, message } = await request.json();

        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return NextResponse.json({ message: 'No valid emails found' }, { status: 400 });
        }

        const emailUser = process.env.EMAIL_USER?.trim();
        const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s/g, '');

        if (!emailUser || !emailPass) {
            console.warn("⚠️ Email credentials missing for campaign.");
            return NextResponse.json({ 
                message: 'Email credentials missing', 
                sent: 0, 
                failed: emails.length 
            }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        let sentCount = 0;
        let failedCount = 0;

        // Loop through emails and send
        for (const email of emails) {
            try {
                await transporter.sendMail({
                    from: `"Mewari Achaar" <${emailUser}>`,
                    to: email,
                    subject: subject,
                    html: `
                        <div style="font-family: 'Times New Roman', serif; max-width: 600px; margin: 0 auto; border: 1px solid #D4AF37; border-radius: 16px; overflow: hidden; background: white; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                            <div style="background: #8B0000; padding: 40px; text-align: center;">
                                <img src="https://www.mewari-achar.shop/favicon.png" alt="Logo" style="height: 60px; filter: brightness(0) invert(1);" />
                                <h2 style="color: white; margin: 15px 0 0; letter-spacing: 3px; text-transform: uppercase; font-size: 1.2rem;">Mewari Achaar</h2>
                            </div>
                            <div style="padding: 40px; text-align: center;">
                                <p style="font-size: 1.1rem; line-height: 1.8; color: #333; white-space: pre-wrap; font-style: italic;">${message}</p>
                                <div style="margin-top: 40px;">
                                    <a href="https://www.mewari-achar.shop/" style="background: #8B0000; color: white; padding: 15px 40px; border-radius: 4px; text-decoration: none; font-size: 0.9rem; border: 1px solid #D4AF37; text-transform: uppercase; letter-spacing: 2px; display: inline-block;">Explore the Collection</a>
                                </div>
                            </div>
                            <div style="background: #fdfbf7; padding: 20px; text-align: center; border-top: 1px solid #eee; font-size: 0.8rem; color: #999;">
                                &copy; 2026 Mewari Homemade Achaar, Chittorgarh. All rights reserved.
                            </div>
                        </div>
                    `
                });
                sentCount++;
            } catch (err) {
                console.error(`Failed to send to ${email}:`, err);
                failedCount++;
            }
        }

        return NextResponse.json({ sent: sentCount, failed: failedCount });
    } catch (error) {
        console.error('Campaign Error:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}