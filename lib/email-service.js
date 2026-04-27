import nodemailer from 'nodemailer';

/**
 * Sends the premium artisanal Mewari Welcome Email.
 * This can be called directly from server-side routes to avoid hitting internal HTTP endpoints.
 */
export async function sendMewariWelcomeEmail(email, name = '') {
  try {
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s/g, '');

    if (!emailUser || !emailPass) {
      console.warn("[EMAIL SERVICE] Missing credentials. Email skipped for:", email);
      return { success: false, message: 'Missing credentials' };
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: emailUser, pass: emailPass },
    });

    const year = new Date().getFullYear();

    const mailOptions = {
      from: `"Mewari Special Achaar" <${emailUser}>`,
      to: email,
      subject: "खम्मा घणी! मेवाड़ रो असल और पारंपरिक स्वाद - मेवाड़ी अचार परिवार में आपका स्वागत है 🏺",
      html: `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f8f5f0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f5f0; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#ffffff; border: 1.5px solid #8B0000; border-radius:12px; overflow:hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.05);">
          <tr>
            <td align="center" style="padding: 25px 20px 10px; background-color: #8B0000;">
               <h1 style="margin:0; color:#D4AF37; font-size:28px; letter-spacing:2px; font-weight: 700;">मेवाड़ी अचार</h1>
               <p style="margin:5px 0 0; color:#fdfbf7; font-size:12px; letter-spacing:4px; text-transform:uppercase;">शुद्धता और परंपरा</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 40px 20px; text-align:center;">
                <div style="font-size: 50px; margin-bottom: 20px;">🏺</div>
                <h2 style="margin:0; color:#8B0000; font-size:32px; font-weight:700;">खम्मा घणी हुकुम, ${name || 'पधारो'}!</h2>
                <p style="margin:10px 0 0; font-size:20px; color:#D4AF37; font-weight: 600;">मेवाड़ रा स्वाद रो स्वागत है।</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 45px 30px;">
              <div style="width:100%; height:1px; background:#eeeeee; margin: 0 auto 30px;"></div>
              <p style="margin:0 0 20px; font-size:18px; color:#2C1810; line-height:1.7; text-align:center;">
                आपके हमारे मेवाड़ी अचार परिवार का हिस्सा बनने पर हमें बहुत खुशी है। हमारे यहाँ हर जार में आपको मिलेगा वही स्वाद, जो पीढ़ियों पुरानी हमारी दादी-नानी की रेसिपी से बना है।
              </p>
              <p style="margin:0; font-size:18px; color:#2C1810; line-height:1.7; text-align:center; font-weight: 600;">
                बिना किसी मिलावट के, शुद्ध मसालों और प्यार से तैयार किया गया असली मेवाड़ी अचार।
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fdf9f0; border-radius:10px; border: 1px solid #D4AF37; padding: 20px;">
                <tr>
                  <td width="50%" align="center" style="border-right: 1px solid #D4AF37;">
                    <div style="font-size:30px; margin-bottom:10px;">👵</div>
                    <p style="margin:0; font-size:13px; color:#8B0000; font-weight:700;">घर जैसा स्वाद</p>
                  </td>
                  <td width="50%" align="center">
                    <div style="font-size:30px; margin-bottom:10px;">🌟</div>
                    <p style="margin:0; font-size:13px; color:#8B0000; font-weight:700;">100% शुद्ध</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 40px 45px;">
              <a href="https://www.mewari-achar.shop" style="display:inline-block; padding: 16px 40px; background:#8B0000; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:700; font-size:16px; border: 2px solid #D4AF37;">अभी स्वाद चखें</a>
            </td>
          </tr>
          <tr>
            <td style="background:#2C1810; padding: 40px 20px; text-align:center; color:#ffffff;">
              <p style="margin:0 0 10px; font-size:18px; font-weight:600; color:#D4AF37;">मेवाड़ी स्पेशल अचार</p>
              <p style="margin:0 0 25px; font-size:12px; color:rgba(255,255,255,0.7);">चित्तौड़गढ़, राजस्थान</p>
              <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:25px;">
                <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.6);">विजय लक्ष्मी शर्मा | mewariachar@gmail.com</p>
                <p style="margin:5px 0 0; font-size:12px; color:rgba(255,255,255,0.6);">&copy; ${year} Mewari Homemade Achaar.</p>
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
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('[EMAIL SERVICE] Error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Sends a security alert when the password is changed.
 */
export async function sendPasswordChangedEmail(email, name = '') {
  try {
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s/g, '');

    if (!emailUser || !emailPass) {
      console.warn("[EMAIL SERVICE] Missing credentials. Password change alert skipped for:", email);
      return { success: false, message: 'Missing credentials' };
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: emailUser, pass: emailPass },
    });

    const now = new Date();
    const date = now.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const time = now.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });

    const mailOptions = {
      from: `"Mewari Special Achaar Security" <${emailUser}>`,
      to: email,
      subject: "Security Alert: Your password was changed - मेवाड़ी स्पेशल अचार",
      html: `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f8f5f0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f5f0; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#ffffff; border: 1.5px solid #8B0000; border-radius:12px; overflow:hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.05);">
          <tr>
            <td align="center" style="padding: 25px 20px 10px; background-color: #8B0000;">
               <h1 style="margin:0; color:#D4AF37; font-size:24px; letter-spacing:2px;">Security Alert</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 40px 20px; text-align:center;">
                <div style="font-size: 50px; margin-bottom: 20px;">🔐</div>
                <h2 style="margin:0; color:#8B0000; font-size:24px; font-weight:700;">Password Changed Successfully</h2>
                <p style="margin:10px 0 0; font-size:16px; color:#2C1810;">Your account password was updated recently.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 45px 30px;">
              <div style="background:#fdf9f0; border-radius:10px; border: 1px solid #D4AF37; padding: 20px; text-align: left;">
                <p style="margin:0 0 10px; font-size:14px; color:#666;">Details of the change:</p>
                <p style="margin:0 0 5px; font-size:16px; color:#2C1810;"><strong>Date:</strong> ${date}</p>
                <p style="margin:0 0 5px; font-size:16px; color:#2C1810;"><strong>Time:</strong> ${time}</p>
                <p style="margin:0 0 5px; font-size:16px; color:#2C1810;"><strong>Location:</strong> Rajasthan, India (Approx)</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 45px 40px;">
              <p style="margin:0 0 20px; font-size:15px; color:#2C1810; line-height:1.6;">
                If you made this change, you can safely ignore this email.
              </p>
              <p style="margin:0; font-size:15px; color:#8B0000; font-weight: 600; line-height:1.6;">
                If you did NOT change your password, please contact our support team immediately or reset your password again to secure your account.
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 40px 45px;">
              <a href="https://www.mewari-achar.shop/login" style="display:inline-block; padding: 14px 30px; background:#8B0000; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:700; font-size:14px;">Go to My Account</a>
            </td>
          </tr>
          <tr>
            <td style="background:#2C1810; padding: 30px 20px; text-align:center; color:#ffffff;">
              <p style="margin:0 0 10px; font-size:16px; font-weight:600; color:#D4AF37;">मेवाड़ी स्पेशल अचार</p>
              <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.6);">&copy; ${now.getFullYear()} Mewari Homemade Achaar Security Team.</p>
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
    return { success: true, message: 'Password change alert sent' };
  } catch (error) {
    console.error('[EMAIL SERVICE] Password Alert Error:', error);
    return { success: false, message: error.message };
  }
}
