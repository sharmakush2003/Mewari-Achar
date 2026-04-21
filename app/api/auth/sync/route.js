import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminFirestore } from '@/lib/firebase-admin';
import { sendMewariWelcomeEmail } from '@/lib/email-service';

export async function POST(request) {
    try {
        const { idToken } = await request.json();
        if (!idToken) return NextResponse.json({ error: 'Missing token' }, { status: 400 });

        const auth = getAdminAuth();
        const db = getAdminFirestore();

        // 1. Verify the user's token
        const decodedToken = await auth.verifyIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        const authUser = await auth.getUser(uid);
        const creationTime = new Date(authUser.metadata.creationTime).getTime();
        const lastSignInTime = new Date(authUser.metadata.lastSignInTime).getTime();
        
        // Brand new account check (within 5 minutes)
        const isBrandNewAuth = Math.abs(lastSignInTime - creationTime) < 300000;
        const exists = userDoc.exists;

        // 2. Ensure Firestore record exists
        if (!exists) {
            await userRef.set({
                uid,
                email: email || null,
                displayName: name || 'Valued Guest',
                photoURL: picture || null,
                createdAt: new Date(),
                isAnonymous: false,
                welcomeEmailSent: true // Mark so we don't spam
            });
        }

        // 3. TRIGGER WELCOME EMAIL (The Khamma Ghani logic)
        // If it's a new auth account or the firestore doc was missing
        if (isBrandNewAuth || !exists) {
            console.log(`[AUTH SYNC] Sending Khamma Ghani to new user: ${email}`);
            await sendMewariWelcomeEmail(email, name || 'हुकुम').catch(err => {
                console.error("[AUTH SYNC] Email failed:", err);
            });
        } else {
            // Normal login alert logic could go here if needed
        }

        return NextResponse.json({ success: true, isNewUser: !exists || isBrandNewAuth });

    } catch (error) {
        console.error('[AUTH SYNC] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
