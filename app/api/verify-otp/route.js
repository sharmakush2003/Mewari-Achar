import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { verifyOtpToken } from '@/lib/otpStore';
import { getAdminAuth } from '@/lib/firebase-admin';
import { sendMewariWelcomeEmail } from '@/lib/email-service';

// Helper for timeout
const withTimeout = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
    ]);
};

export async function POST(request) {
    try {
        const { email, otp, token } = await request.json();

        if (!email || !otp) {
            return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
        }

        const emailKey = email.toLowerCase();
        let storedOtp = null;
        let isFromDb = false;

        // Try Firestore first with timeout
        try {
            const otpDocRef = doc(db, 'otps', emailKey);
            const otpDoc = await withTimeout(getDoc(otpDocRef), 3000);
            
            if (otpDoc.exists()) {
                const data = otpDoc.data();
                if (Date.now() <= data.expiry) {
                    storedOtp = data.otp;
                    isFromDb = true;
                }
            }
        } catch (dbError) {
            console.error('Firestore verify check failed or timed out:', dbError.message);
        }

        if (!storedOtp) {
            // If Firestore failed, check the stateless token
            if (token && verifyOtpToken(emailKey, otp, token)) {
                console.log(`[VERIFY] Successfully verified stateless token for ${emailKey}`);
                storedOtp = otp; // Mark as verified
            }
        }

        if (!storedOtp) {
            return NextResponse.json({ message: 'No valid OTP found or it has expired', success: false }, { status: 400 });
        }

        // Final verification
        if (storedOtp !== otp) {
            return NextResponse.json({ message: 'Invalid verification code', success: false }, { status: 400 });
        }

        // Valid! Cleanup
            try {
                await withTimeout(deleteDoc(doc(db, 'otps', emailKey)), 2000);
            } catch (e) {
                console.warn('Final cleanup of OTP in Firestore failed or timed out (safe to ignore)');
            }

        // --- NEW REAL AUTH LOGIC ---
        let customToken = null;
        let isNewUser = false;
        
        try {
            const adminAuth = getAdminAuth();
            if (adminAuth) {
                // 1. Get or Create user in Firebase Auth
                let userRecord;
                try {
                    userRecord = await adminAuth.getUserByEmail(emailKey);
                } catch (error) {
                    if (error.code === 'auth/user-not-found') {
                        userRecord = await adminAuth.createUser({
                            email: emailKey,
                            emailVerified: true,
                        });
                        isNewUser = true;
                    } else {
                        throw error;
                    }
                }

                // 2. Generate Custom Token for the frontend
                customToken = await adminAuth.createCustomToken(userRecord.uid);
            }
        } catch (authError) {
            console.error('Real Auth (Admin) failed:', authError.message);
        }

        return NextResponse.json({ 
            message: 'OTP verified successfully', 
            success: true,
            customToken: customToken,
            isNewUser: isNewUser
        });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        return NextResponse.json({ 
            message: 'Failed to verify OTP', 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}
