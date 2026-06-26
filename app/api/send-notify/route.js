import { NextResponse } from 'next/server';
import { sendWaitlistEmail } from '@/lib/email-service';
import { getAdminFirestore } from '@/lib/firebase-admin';

export async function POST(request) {
  try {
    const { userEmail, userName, productName, adminEmail, phone, productCode } = await request.json();

    if (!userEmail || !productName) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const targetAdminEmail = adminEmail || 'kushsharma.cor@gmail.com';

    const result = await sendWaitlistEmail(userEmail, userName, productName, targetAdminEmail, phone);

    // Save to Firestore for the Admin App
    try {
      const db = getAdminFirestore();
      if (db) {
        await db.collection('waitlist').add({
          userEmail,
          userName: userName || 'User',
          productName,
          phone: phone || null,
          createdAt: new Date()
        });

        // Query users collection by email and update waitlistedProducts array
        const usersRef = db.collection('users');
        const querySnapshot = await usersRef.where('email', '==', userEmail).get();
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          
          // Determine product codes to add (save both space and underscore to be safe)
          const codesToAdd = [];
          if (productCode) {
            codesToAdd.push(productCode.toUpperCase());
            codesToAdd.push(productCode.toUpperCase().replace(/_/g, ' '));
          } else {
            // Fallback: derive from productName
            const baseName = productName.replace(/\(.*?\)/g, '').trim();
            const cleanCode = baseName.toUpperCase();
            codesToAdd.push(cleanCode);
            codesToAdd.push(cleanCode.replace(/\s+/g, '_'));
          }

          const admin = require('firebase-admin');
          await userDoc.ref.update({
            waitlistedProducts: admin.firestore.FieldValue.arrayUnion(...codesToAdd)
          });
          console.log(`[WAITLIST SYNC] Updated waitlistedProducts for user email ${userEmail} with:`, codesToAdd);
        }
      }
    } catch (dbError) {
      console.error("Failed to save waitlist to Firestore:", dbError);
    }

    if (result.success) {
      return NextResponse.json({ message: 'Waitlist processed successfully', success: true });
    } else {
      return NextResponse.json({ message: 'Emails failed to send.', error: result.message }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in send-notify API:', error);
    return NextResponse.json({ 
        message: 'Request failed.', 
        error: error.message
    }, { status: 500 });
  }
}
