import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminFirestore } from '@/lib/firebase-admin';
import { sendMewariWelcomeEmail } from '@/lib/email-service';

export async function POST(request) {
    try {
        const { idToken, displayName: bodyDisplayName } = await request.json();
        if (!idToken) return NextResponse.json({ error: 'Missing token' }, { status: 400 });

        const auth = getAdminAuth();
        const db = getAdminFirestore();

        // 1. Verify the user's token
        const decodedToken = await auth.verifyIdToken(idToken);
        const { uid, email, name, picture } = decodedToken;
        
        // Priority: Decoded Token Name > Body Name > Fallback
        const finalDisplayName = name || bodyDisplayName || 'Guest';

        const userRef = db.collection('users').doc(uid);
        const userDoc = await userRef.get();

        const authUser = await auth.getUser(uid);
        const creationTime = new Date(authUser.metadata.creationTime).getTime();
        const lastSignInTime = new Date(authUser.metadata.lastSignInTime).getTime();
        
        // Brand new account check (within 5 minutes)
        const isBrandNewAuth = Math.abs(lastSignInTime - creationTime) < 300000;
        const exists = userDoc.exists;

        // 2. Ensure Firestore record exists and is up to date
        if (!userDoc.exists) {
            await userRef.set({
                uid,
                email: email || null,
                displayName: finalDisplayName,
                photoURL: picture || null,
                createdAt: new Date(),
                isAnonymous: false,
                welcomeEmailSent: true // Mark so we don't spam
            });
        } else {
            const currentData = userDoc.data();
            // If the current name is a placeholder and we have a better one, update it!
            if ((currentData.displayName === 'Valued Guest' || currentData.displayName === 'Guest' || !currentData.displayName) && finalDisplayName !== 'Guest') {
                await userRef.update({ displayName: finalDisplayName });
            }
        }

        // 3. TRIGGER WELCOME EMAIL (The Khamma Ghani logic)
        const userData = userDoc.data();
        if ((isBrandNewAuth || !exists) && !userData?.welcomeEmailSent) {
            console.log(`[AUTH SYNC] Sending Khamma Ghani to new user: ${email}`);
            await sendMewariWelcomeEmail(email, name || 'हुकुम').catch(err => {
                console.error("[AUTH SYNC] Email failed:", err);
            });
            // Update the flag so we don't send it again
            await userRef.update({ welcomeEmailSent: true });
        }

        return NextResponse.json({ success: true, isNewUser: !exists || isBrandNewAuth });

    } catch (error) {
        console.error('[AUTH SYNC] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
