import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { orderData } = await request.json();
        const { name, email, phone, address, items, total, instructions } = orderData;

        const emailUser = process.env.EMAIL_USER?.trim();
        const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s/g, '');

        if (!emailUser || !emailPass) {
            return NextResponse.json({ message: 'Server credentials missing', success: false }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const orderDetailsHtml = items.map(item => `
            <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0;">${item.name} (${item.size})</td>
                <td style="padding: 10px 0; text-align: center;">x${item.qty}</td>
                <td style="padding: 10px 0; text-align: right;">₹${item.price * item.qty}</td>
            </tr>
        `).join('');

        // 1. Customer Confirmation Email
        const customerMailOptions = {
            from: `"Mewari Special Achaar" <${emailUser}>`,
            to: email,
            subject: 'Order Received! - Mewari Special Achaar',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h2 style="color: #8b4513;">Namaste ${name}!</h2>
                    <p>Thank you for your order. We have received your request and will contact you shortly for delivery details.</p>
                    
                    <div style="background-color: #fdf5e6; padding: 20px; border-radius: 8px; border: 1px solid #d2691e;">
                        <h3 style="margin-top: 0;">Order Summary</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="border-bottom: 2px solid #d2691e;">
                                    <th style="text-align: left; padding-bottom: 10px;">Item</th>
                                    <th style="padding-bottom: 10px;">Qty</th>
                                    <th style="text-align: right; padding-bottom: 10px;">Price</th>
                                </tr>
                            </thead>
                            <tbody>${orderDetailsHtml}</tbody>
                        </table>
                        <div style="text-align: right; margin-top: 15px; font-weight: bold; font-size: 1.2rem;">
                            Total: ₹${total}
                        </div>
                    </div>
                    
                    <p style="margin-top: 20px;"><strong>Delivery Address:</strong><br/>${address}</p>
                    <p style="font-size: 0.9rem; color: #666;">Note: Delivery charges will be informed separately based on your location.</p>
                </div>
            `,
        };

        // 2. Owner Alert Email
        const ownerMailOptions = {
            from: `"Website Order Alert" <${emailUser}>`,
            to: emailUser, // Sending to owner
            subject: `🚨 NEW ORDER from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #8b4513; padding: 20px; border-radius: 12px;">
                    <h2 style="color: #8b4513; margin-top: 0;">New Online Order!</h2>
                    <hr>
                    <p><strong>Customer:</strong> ${name}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    ${instructions ? `<p><strong>Instructions:</strong> ${instructions}</p>` : ''}
                    
                    <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Items Ordered:</h3>
                        <table style="width: 100%;">${orderDetailsHtml}</table>
                        <h3 style="text-align: right;">Total Amount: ₹${total}</h3>
                    </div>
                    <p>Click here to WhatsApp the customer: <a href="https://wa.me/91${phone.replace(/\D/g, '')}">${phone}</a></p>
                </div>
            `,
        };

        // Send both
        await Promise.all([
            transporter.sendMail(customerMailOptions),
            transporter.sendMail(ownerMailOptions)
        ]);

        return NextResponse.json({ message: 'Order alerts sent successfully', success: true });

    } catch (error) {
        console.error('Error in send-order-alert API:', error);
        return NextResponse.json({ message: 'Failed to send order alerts', error: error.message }, { status: 500 });
    }
}
