import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s/g, '');

    if (!emailUser || !emailPass) {
      return NextResponse.json({ message: 'Server misconfigured', success: false }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: emailUser, pass: emailPass },
    });

    const year = new Date().getFullYear();

    const mailOptions = {
      from: `"Mewari Homemade Achaar" <${emailUser}>`,
      to: email,
      subject: "Namaste! Welcome to the Mewari Achaar Family 🌿",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Mewari Achaar</title>
</head>
<body style="margin:0; padding:0; background-color:#FFFDD0; font-family:'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFDD0; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- OUTER CONTAINER -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#ffffff; border:1px solid rgba(212,175,55,0.2); border-radius:24px; overflow:hidden; box-shadow: 0 40px 100px rgba(0,0,0,0.1);">
          
          <!-- TOP GLOW BAR -->
          <tr>
            <td height="5" style="background:linear-gradient(90deg, #8B0000, #D4AF37, #8B0000);"></td>
          </tr>

          <!-- HEADER / BRANDING -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align:center;">
              <p style="margin:0; color:#8B0000; font-size:12px; font-weight:700; letter-spacing:5px; text-transform:uppercase;">Mewari Special Achaar</p>
            </td>
          </tr>

          <!-- HERO SECTION -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="width:100%; text-align:center; padding: 40px 0; background: radial-gradient(circle at center, rgba(212,175,55,0.05), transparent);">
                <span style="font-size: 60px;">🏺</span>
                <h1 style="margin:20px 0 10px; font-family: 'Playfair Display', Georgia, serif; font-size:36px; font-weight:700; color:#8B0000; line-height:1.2;">Namaste, ${name || 'Valued Guest'}!</h1>
                <p style="margin:0; font-size:18px; color:#D4AF37; font-style:italic;">Welcome to the family of artisanal taste.</p>
              </div>
            </td>
          </tr>

          <!-- MAIN CONTENT -->
          <tr>
            <td style="padding: 20px 40px 30px;">
              <div style="width:80px; height:2px; background:#D4AF37; margin: 0 auto 30px;"></div>
              
              <p style="margin:0; font-size:16px; color:#2C1810; line-height:1.8; text-align:center;">
                Thank you for joining <strong>Mewari Achaar</strong>. We believe that a meal is incomplete without the perfect accompaniment. Our pickles are crafted using <strong>heirloom recipes</strong> passed down through generations, ensuring every jar is bursting with the legacy of Mewar.
              </p>
            </td>
          </tr>

          <!-- FEATURES PANEL -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fdfbf7; border:1px solid #eee; border-radius:16px; padding: 25px;">
                <tr>
                  <td width="33.33%" align="center">
                    <div style="font-size:24px; margin-bottom:8px;">🌿</div>
                    <p style="margin:0; font-size:11px; color:#8B0000; font-weight:700; text-transform:uppercase;">100% Natural</p>
                  </td>
                  <td width="33.33%" align="center" style="border-left:1px solid #eee; border-right:1px solid #eee;">
                    <div style="font-size:24px; margin-bottom:8px;">👵</div>
                    <p style="margin:0; font-size:11px; color:#8B0000; font-weight:700; text-transform:uppercase;">Handcrafted</p>
                  </td>
                  <td width="33.33%" align="center">
                    <div style="font-size:24px; margin-bottom:8px;">❤️</div>
                    <p style="margin:0; font-size:11px; color:#8B0000; font-weight:700; text-transform:uppercase;">Preservative Free</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA BUTTON -->
          <tr>
            <td align="center" style="padding: 0 40px 40px;">
              <a href="https://mewari-achar.vercel.app" style="display:inline-block; padding: 18px 45px; background:#8B0000; color:#ffffff; text-decoration:none; border-radius:50px; font-weight:700; font-size:14px; letter-spacing:1px; text-transform:uppercase; box-shadow: 0 10px 25px rgba(139,0,0,0.3);">Explore Our Collection</a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#2C1810; padding: 40px; text-align:center; color:#ffffff;">
              <p style="margin:0 0 6px; font-family: 'Playfair Display', Georgia, serif; font-size:24px; font-weight:500; color:#D4AF37;">Mewari <span style="color:#ffffff; font-weight:300;">Achaar</span></p>
              <p style="margin:0 0 25px; font-size:11px; color:rgba(255,255,255,0.5); letter-spacing:4px; text-transform:uppercase;">Preserving Tradition With Love</p>

              <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:25px;">
                <p style="margin:0; font-size:11px; color:rgba(255,255,255,0.5);">
                  &copy; ${year} Mewari Homemade Achaar. No rights reserved (only love).
                </p>
                <p style="margin:12px 0 0; font-size:12px; color:#D4AF37; font-weight:600;">
                  rajesh.chittaurgarh@gmail.com | +91 9785054474
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Welcome email sent successfully', success: true });

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return NextResponse.json({ 
        message: 'Email failed to send. Check your App Password.', 
        error: error.message,
        details: error.code || 'UNKNOWN_ERROR'
    }, { status: 500 });
  }
}
