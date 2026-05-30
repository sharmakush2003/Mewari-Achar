import { NextResponse } from 'next/server';
import { sendMewariGoodbyeEmail } from '@/lib/email-service';

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Missing email field' }, { status: 400 });
    }

    const result = await sendMewariGoodbyeEmail(email, name);

    if (result.success) {
      return NextResponse.json({ message: 'Goodbye email sent successfully', success: true });
    } else {
      return NextResponse.json({ message: 'Email failed to send.', error: result.message }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in send-goodbye API:', error);
    return NextResponse.json({
        message: 'Email failed to send.',
        error: error.message
    }, { status: 500 });
  }
}
