import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request) {
  try {
    const { amount, currency, receipt } = await request.json();

    // Validate request fields
    if (!amount) {
      return NextResponse.json({ error: 'Missing required field: amount' }, { status: 400 });
    }

    // Parse amount to number
    const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount)) {
      return NextResponse.json({ error: 'Amount must be an integer representing paise' }, { status: 400 });
    }

    // Minimum amount: 100 paise
    if (parsedAmount < 100) {
      return NextResponse.json({ error: 'Amount must be at least 100 paise (₹1.00)' }, { status: 400 });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json({ error: 'Razorpay credentials are not configured on the server.' }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: key_id,
      key_secret: key_secret
    });

    const options = {
      amount: parsedAmount,
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`
    };

    try {
      const order = await razorpay.orders.create(options);
      return NextResponse.json({
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: key_id
      });
    } catch (err) {
      console.error('Razorpay Order Creation Error:', err);
      if (err.statusCode === 401) {
        return NextResponse.json({ error: 'Razorpay Authentication failed. Check KEY_ID and KEY_SECRET.' }, { status: 401 });
      }
      return NextResponse.json({ error: err.description || err.message || 'Failed to create Razorpay order' }, { status: 500 });
    }

  } catch (error) {
    console.error('Order route error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
