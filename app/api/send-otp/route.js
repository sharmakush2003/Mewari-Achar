import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { generateOtpToken } from '@/lib/otpStore';

// Helper for timeout
const withTimeout = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
    ]);
};

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = Date.now() + 5 * 60 * 1000;

        // Try to store in Firestore with a strict 3-second timeout
        try {
            await withTimeout(setDoc(doc(db, 'otps', email.toLowerCase()), {
                otp,
                expiry
            }), 3000);
            console.log(`[STORAGE] OTP saved to Firestore for ${email}`);
        } catch (dbError) {
            // Fallback to local memory so user isn't blocked
            // saveOtp(email, otp); // No longer needed as we use stateless tokens
        }

        // Always generate a token to be safe for serverless/vercel
        const token = generateOtpToken(email, otp, expiry);

        const emailUser = process.env.EMAIL_USER?.trim();
        const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s/g, '');

        if (!emailUser || !emailPass) {
            console.warn("⚠️ Email credentials missing. OTP simulated for:", email);
            console.log(`[MOCK OTP] Email: ${email}, OTP: ${otp}`);
            return NextResponse.json({ 
                message: 'OTP simulated (missing server credentials)', 
                success: true,
                otp: otp // Returning OTP for easy testing when no email is config
            });
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
            from: `"Mewari Special Achaar" <${emailUser}>`,
            to: email,
            subject: 'Your Verification Code - Mewari Special Achaar',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff;">
                    <div style="text-align: center; margin-bottom: 25px;">
                        <h2 style="color: #8b4513; margin: 0; font-size: 24px;">Verification Code</h2>
                    </div>
                    <p style="color: #444; font-size: 16px;">Hello,</p>
                    <p style="color: #444; font-size: 16px;">Your verification code for Mewari Special Achaar is:</p>
                    <div style="background-color: #fdf5e6; padding: 25px; border-radius: 10px; margin: 25px 0; text-align: center; border: 1px dashed #d2691e;">
                        <h1 style="color: #d2691e; font-size: 42px; margin: 0; letter-spacing: 10px; font-weight: bold; white-space: nowrap; display: block; width: 100%;">${otp}</h1>
                    </div>
                    <p style="color: #444; font-size: 14px;">This code will expire in <strong style="color: #d2691e;">5 minutes</strong>.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                    <p style="font-size: 12px; color: #666; text-align: center; line-height: 1.6;">
                        <strong>Security Note:</strong> Mewari Special Achaar Security Team will never call or message you for this code. Do not share your OTP with anyone for security reasons.
                    </p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ 
            message: 'OTP sent successfully', 
            success: true,
            token: token // This token will stay in the browser for verification
        });

    } catch (error) {
        console.error('Error in send-otp API:', error);
        return NextResponse.json({ 
            message: `Server Error: ${error.message}`, 
            success: false 
        }, { status: 500 });
    }
}
