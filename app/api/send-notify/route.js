import { NextResponse } from 'next/server';
import { sendWaitlistEmail } from '@/lib/email-service';
import { getAdminFirestore } from '@/lib/firebase-admin';

export async function POST(request) {
  try {
    const { userEmail, userName, productName, adminEmail, phone } = await request.json();

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
