import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    // Missing fields: return 400
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment signature verification details' }, { status: 400 });
    }

    // Bypass for simulated development testing
    if (razorpay_payment_id === 'pay_simulated') {
      console.log('Simulated Payment Verified Successfully');
      return NextResponse.json({ status: 'success', message: 'Payment verified successfully (Simulated)' });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return NextResponse.json({ error: 'Razorpay secret key is not configured on the server.' }, { status: 500 });
    }

    // Generate signature
    const generated_signature = crypto
      .createHmac('sha256', key_secret)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    // Compare generated signature with razorpay_signature
    if (generated_signature === razorpay_signature) {
      console.log('Payment Signature Verified Successfully');
      return NextResponse.json({ status: 'success', message: 'Payment verified successfully' });
    } else {
      console.warn('Payment Signature Mismatch!');
      return NextResponse.json({ status: 'failure', error: 'Payment signature mismatch' }, { status: 400 });
    }

  } catch (error) {
    console.error('Verification route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
