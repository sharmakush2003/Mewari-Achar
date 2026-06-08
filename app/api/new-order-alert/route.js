import { NextResponse } from 'next/server';
import { sendAdminOrderAlert } from '@/lib/email-service';

export async function POST(request) {
  try {
    const { orderId, amount, paymentMethod } = await request.json();

    if (!orderId) {
      return NextResponse.json({ message: 'Missing orderId' }, { status: 400 });
    }

    const adminEmail = 'kushsharma.cor@gmail.com';
    const result = await sendAdminOrderAlert(adminEmail, orderId, amount, paymentMethod);

    if (result.success) {
      return NextResponse.json({ message: 'Admin alert sent successfully', success: true });
    } else {
      return NextResponse.json({ message: 'Email failed to send.', error: result.message }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in new-order-alert API:', error);
    return NextResponse.json({
        message: 'Email failed to send.',
        error: error.message
    }, { status: 500 });
  }
}
