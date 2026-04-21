import { NextResponse } from 'next/server';
import { sendMewariWelcomeEmail } from '@/lib/email-service';

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const result = await sendMewariWelcomeEmail(email, name);

    if (result.success) {
      return NextResponse.json({ message: 'Welcome email sent successfully', success: true });
    } else {
      return NextResponse.json({ message: 'Email failed to send.', error: result.message }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in send-welcome API:', error);
    return NextResponse.json({ 
        message: 'Email failed to send.', 
        error: error.message
    }, { status: 500 });
  }
}
