import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { to, displayName, deviceInfo, loginTime, type } = await request.json();

        const emailUser = process.env.EMAIL_USER?.trim();
        const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s/g, '');

        const isSignup = type === 'signup';
        const subject = isSignup ? 'Welcome to Mewari Special Achaar!' : 'New Login Alert - Mewari Special Achaar';

        const loginContent = `
            <h2 style="color: #8b4513; text-align: center;">New Login Detected</h2>
            <p>Hello ${displayName || 'User'},</p>
            <p>We detected a new login to your Mewari Special Achaar account.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Time:</strong> ${loginTime}</p>
                <p><strong>Device:</strong> ${deviceInfo}</p>
            </div>

            <p>If this was you, you can ignore this email.</p>
            <p style="color: #d32f2f;"><strong>If you did not sign in, please contact support immediately.</strong></p>
        `;

        const signupContent = `
            <h2 style="color: #8b4513; text-align: center;">Welcome to Mewari Special Achaar!</h2>
            <p>Hello ${displayName || 'User'},</p>
            <p>Thank you for creating an account with Mewari Special Achaar. We are excited to share our authentic homemade pickles with you!</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Account created on:</strong> ${loginTime}</p>
                <p><strong>Device:</strong> ${deviceInfo}</p>
            </div>

            <p>Start exploring our collection of traditional Indian pickles made with love and secret family recipes.</p>
        `;

        if (!emailUser || !emailPass) {
            console.warn("⚠️ Email credentials not found in env. Email would have been sent to:", to);
            return NextResponse.json({ message: 'Email simulated (missing credentials)', success: true });
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

        const mailOptions = {
            from: `"Mewari Special Achaar Team" <${emailUser}>`,
            to: to,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5d5c5; border-radius: 8px;">
                    ${isSignup ? signupContent : loginContent}
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666; text-align: center;">Mewari Special Achaar Security Team</p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully', success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
    }
}
