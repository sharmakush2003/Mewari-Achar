import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { getOtp, deleteOtp } from '@/lib/otpStore';

// Helper for timeout
const withTimeout = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
    ]);
};

export async function POST(request) {
    try {
        const { email, otp } = await request.json();

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

        // If not found in DB (or DB failed), check memory fallback
        if (!storedOtp) {
            storedOtp = getOtp(emailKey);
            if (storedOtp) {
                console.log(`[VERIFY] Found OTP in local memory for ${emailKey}`);
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
        deleteOtp(emailKey);

        return NextResponse.json({ message: 'OTP verified successfully', success: true });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        return NextResponse.json({ 
            message: 'Failed to verify OTP', 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}
