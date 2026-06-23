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
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    });

    const year = new Date().getFullYear();

    const mailOptions = {
      from: `"Mewari Special Achaar" <${emailUser}>`,
      to: email,
      subject: "खम्मा घणी! मेवाड़ रो असल और पारंपरिक स्वाद - मेवाड़ी अचार परिवार में आपका स्वागत है 🏺",
      text: `खम्मा घणी हुकुम, ${name || 'पधारो'}!\n\nमेवाड़ रा स्वाद रो स्वागत है।\n\nआपके हमारे मेवाड़ी अचार परिवार का हिस्सा बनने पर हमें बहुत खुशी है। हमारे यहाँ हर जार में आपको मिलेगा वही स्वाद, जो पीढ़ियों पुरानी हमारी दादी-नानी की रेसिपी से बना है।\nबिना किसी मिलावट के, शुद्ध मसालों और प्यार से तैयार किया गया असली मेवाड़ी अचार।\n\nअभी स्वाद चखें: https://www.mewari-achar.shop\n\nमेवाड़ी स्पेशल अचार\nचित्तौड़गढ़, राजस्थान\nविजय लक्ष्मी शर्मा | mewariachar@gmail.com`,
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
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    });

    const now = new Date();
    const date = now.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const time = now.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });

    const mailOptions = {
      from: `"Mewari Special Achaar Security" <${emailUser}>`,
      to: email,
      subject: "Security Alert: Your password was changed - मेवाड़ी स्पेशल अचार",
      text: `Security Alert\n\nPassword Changed Successfully\nYour account password was updated recently.\n\nDetails of the change:\nDate: ${date}\nTime: ${time}\nLocation: Rajasthan, India (Approx)\n\nIf you made this change, you can safely ignore this email.\nIf you did NOT change your password, please contact our support team immediately or reset your password again to secure your account.\n\nGo to My Account: https://www.mewari-achar.shop/login\n\nमेवाड़ी स्पेशल अचार\nMewari Homemade Achaar Security Team`,
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
}export async function sendMewariGoodbyeEmail(email, name = '') {
  try {
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s/g, '');

    if (!emailUser || !emailPass) {
      console.warn("[EMAIL SERVICE] Missing credentials. Goodbye email skipped for:", email);
      return { success: false, message: 'Missing credentials' };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    });

    const year = new Date().getFullYear();
    const displayName = name || 'हुकुम';

    const mailOptions = {
      from: `"Mewari Special Achaar" <${emailUser}>`,
      to: email,
      subject: "अलविदा, पर दिल से 🏺 — मेवाड़ी अचार परिवार आपको याद करेगा",
      text: `${displayName} जी,\n\nआपका खाता सफलतापूर्वक हटा दिया गया है।\n\nहम समझते हैं कि आपने यह कदम उठाया है। मेवाड़ी अचार परिवार आपको हमेशा याद रखेगा।\n\nजब भी मन करे, हमारे दरवाज़े आपके लिए हमेशा खुले हैं।\n\nफिर मिलेंगे: https://www.mewari-achar.shop\n\nमेवाड़ी स्पेशल अचार\nचित्तौड़गढ़, राजस्थान`,
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
               <h1 style="margin:0; color:#D4AF37; font-size:28px; letter-spacing:2px; font-weight: 700;">मेवाड़ी अचार</h1>
               <p style="margin:5px 0 0; color:#fdfbf7; font-size:12px; letter-spacing:4px; text-transform:uppercase;">शुद्धता और परंपरा</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 40px 20px; text-align:center;">
                <div style="font-size: 56px; margin-bottom: 20px;">🙏</div>
                <h2 style="margin:0; color:#8B0000; font-size:28px; font-weight:700;">अलविदा, ${displayName} जी</h2>
                <p style="margin:12px 0 0; font-size:18px; color:#D4AF37; font-weight: 600;">आपका खाता हटा दिया गया है।</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 45px 30px;">
              <div style="width:100%; height:1px; background:#eeeeee; margin: 0 auto 30px;"></div>
              <p style="margin:0 0 20px; font-size:17px; color:#2C1810; line-height:1.8; text-align:center;">
                हम समझते हैं कि आपने यह फैसला सोच-समझकर किया है। मेवाड़ी अचार परिवार में आपका साथ हमारे लिए बहुत अनमोल था।
              </p>
              <p style="margin:0; font-size:17px; color:#2C1810; line-height:1.8; text-align:center; font-weight: 600;">
                जब भी मन करे, हमारे दरवाज़े आपके लिए हमेशा खुले हैं। 🏺
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fdf9f0; border-radius:10px; border: 1px solid #D4AF37; padding: 20px;">
                <tr>
                  <td width="33%" align="center" style="border-right: 1px solid #D4AF37; padding: 10px 0;">
                    <div style="font-size:28px; margin-bottom:8px;">👵</div>
                    <p style="margin:0; font-size:12px; color:#8B0000; font-weight:700;">पीढ़ियों का स्वाद</p>
                  </td>
                  <td width="33%" align="center" style="border-right: 1px solid #D4AF37; padding: 10px 0;">
                    <div style="font-size:28px; margin-bottom:8px;">🌶️</div>
                    <p style="margin:0; font-size:12px; color:#8B0000; font-weight:700;">असली मसाले</p>
                  </td>
                  <td width="33%" align="center" style="padding: 10px 0;">
                    <div style="font-size:28px; margin-bottom:8px;">💛</div>
                    <p style="margin:0; font-size:12px; color:#8B0000; font-weight:700;">हमेशा याद रहेंगे</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 40px 45px;">
              <p style="margin:0 0 20px; font-size:15px; color:#666; text-align:center;">कभी भी वापस आना चाहें, तो यहाँ से नया खाता बना सकते हैं:</p>
              <a href="https://www.mewari-achar.shop" style="display:inline-block; padding: 16px 40px; background:#8B0000; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:700; font-size:16px; border: 2px solid #D4AF37;">फिर से पधारो</a>
            </td>
          </tr>
          <tr>
            <td style="background:#2C1810; padding: 40px 20px; text-align:center; color:#ffffff;">
              <p style="margin:0 0 10px; font-size:18px; font-weight:600; color:#D4AF37;">मेवाड़ी स्पेशल अचार</p>
              <p style="margin:0 0 25px; font-size:12px; color:rgba(255,255,255,0.7);">चित्तौड़गढ़, राजस्थान</p>
              <div style="border-top:1px solid rgba(255,255,255,0.1); padding-top:25px;">
                <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.6);">विजय लक्ष्मी शर्मा | mewariachar@gmail.com</p>
                <p style="margin:5px 0 0; font-size:12px; color:rgba(255,255,255,0.6);">&copy; ${year} Mewari Homemade Achaar. सदा आपका।</p>
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
    return { success: true, message: 'Goodbye email sent successfully' };
  } catch (error) {
    console.error('[EMAIL SERVICE] Goodbye Email Error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Sends an alert to the admin when a new order is placed from the mobile app.
 */
export async function sendAdminOrderAlert(email, orderId, amount, paymentMethod = 'WhatsApp / UPI') {
  try {
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s/g, '');

    if (!emailUser || !emailPass) {
      console.warn("[EMAIL SERVICE] Missing credentials. Admin order alert skipped.");
      return { success: false, message: 'Missing credentials' };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    });

    const now = new Date();
    const date = now.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const time = now.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });

    const mailOptions = {
      from: `"Mewari Special Achaar App" <${emailUser}>`,
      to: email,
      subject: `🚨 NEW ORDER RECEIVED! Order ID: #${orderId.slice(-6).toUpperCase()} - मेवाड़ी स्पेशल अचार`,
      text: `New Order Received!\n\nA new order has just been placed from the Mobile App.\n\nDetails:\nOrder ID: ${orderId}\nTotal Amount: ₹${amount}\nPayment Method: ${paymentMethod}\nDate: ${date} at ${time}\n\nPlease check Firebase Console and WhatsApp to verify their payment screenshot.\n\nMewari Achaar Mobile App Automated Alert`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0; padding:20px; font-family: 'Segoe UI', sans-serif; background:#f4f4f4;">
  <div style="background:#ffffff; padding:30px; border-radius:10px; border-top: 5px solid #4CAF50; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 600px; margin: auto;">
    <h2 style="color:#2C1810; margin-top:0;">🚨 New Order Received!</h2>
    <p style="color:#555; font-size:16px;">A new order has just been placed from the Android App.</p>
    
    <div style="background:#fdf9f0; padding:20px; border-radius:8px; border: 1px solid #e0d0b0; margin-top: 20px;">
      <p style="margin: 0 0 10px;"><strong>Order ID:</strong> #${orderId}</p>
      <p style="margin: 0 0 10px;"><strong>Amount:</strong> <span style="color:#4CAF50; font-weight:bold;">₹${amount}</span></p>
      <p style="margin: 0 0 10px;"><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p style="margin: 0;"><strong>Time:</strong> ${date} at ${time}</p>
    </div>

    <p style="margin-top: 25px; color:#666; line-height: 1.6;">
      Please check the Firebase Console to view their items and address. Wait for them to send the payment screenshot on WhatsApp before shipping.
    </p>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Admin alert sent successfully' };
  } catch (error) {
    console.error('[EMAIL SERVICE] Admin Alert Error:', error);
    return { success: false, message: error.message };
  }
}

/**
 * Sends a waitlist confirmation to the user and an alert to the admin.
 */
export async function sendWaitlistEmail(userEmail, userName = 'User', productName, adminEmail) {
  try {
    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim().replace(/\s/g, '');

    if (!emailUser || !emailPass) {
      console.warn("[EMAIL SERVICE] Missing credentials. Waitlist email skipped for:", userEmail);
      return { success: false, message: 'Missing credentials' };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: emailUser, pass: emailPass },
    });

    // 1. Email to User
    const userMailOptions = {
      from: `"Mewari Special Achaar" <${emailUser}>`,
      to: userEmail,
      subject: `Waitlist Confirmation: ${productName} - मेवाड़ी स्पेशल अचार`,
      html: `
<!DOCTYPE html>
<html lang="en">
<body style="font-family: sans-serif; background:#f4f4f4; padding:20px;">
  <div style="background:#fff; padding:30px; border-radius:10px; border-top: 5px solid #8B0000; max-width: 600px; margin: auto;">
    <h2 style="color:#2C1810;">You're on the Waitlist! 🏺</h2>
    <p>Hi ${userName},</p>
    <p>Thank you for your interest! You have been successfully added to the waitlist for <strong>${productName}</strong>.</p>
    <p>We will notify you immediately as soon as it launches.</p>
    <br>
    <p>Warm regards,<br>Mewari Achaar Team</p>
  </div>
</body>
</html>
      `,
    };
    await transporter.sendMail(userMailOptions);

    // 2. Email to Admin
    if (adminEmail) {
      const adminMailOptions = {
        from: `"Mewari Achaar System" <${emailUser}>`,
        to: adminEmail,
        subject: `[WAITLIST] New Request for ${productName}`,
        text: `New waitlist request!\n\nUser: ${userName}\nEmail: ${userEmail}\nProduct: ${productName}\n\nThis user wants to be notified when the product launches.`
      };
      await transporter.sendMail(adminMailOptions);
    }

    return { success: true, message: 'Waitlist emails sent successfully' };
  } catch (error) {
    console.error('[EMAIL SERVICE] Waitlist Email Error:', error);
    return { success: false, message: error.message };
  }
}
