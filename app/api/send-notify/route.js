import { NextResponse } from 'next/server';
import { sendWaitlistEmail } from '@/lib/email-service';

export async function POST(request) {
  try {
    const { userEmail, userName, productName, adminEmail, phone } = await request.json();

    if (!userEmail || !productName) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const result = await sendWaitlistEmail(userEmail, userName, productName, adminEmail, phone);

    if (result.success) {
      return NextResponse.json({ message: 'Waitlist emails sent successfully', success: true });
    } else {
      return NextResponse.json({ message: 'Emails failed to send.', error: result.message }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in send-notify API:', error);
    return NextResponse.json({ 
        message: 'Emails failed to send.', 
        error: error.message
    }, { status: 500 });
  }
}
