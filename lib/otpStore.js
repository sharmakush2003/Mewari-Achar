import crypto from 'crypto';

/**
 * GENERATE a secure token for an OTP.
 * This is "stateless" because we don't save anything in memory. 
 * We just sign the data so the server can verify it later.
 */
export const generateOtpToken = (email, otp, expiry) => {
    const secret = process.env.OTP_SECRET || 'fallback-secret-for-dev-only-123';
    const data = `${email.toLowerCase()}:${otp}:${expiry}`;
    const signature = crypto.createHmac('sha256', secret).update(data).digest('hex');
    
    // Return the signature and expiry joined together
    return `${signature}.${expiry}`;
};

/**
 * VERIFY an OTP against a token.
 */
export const verifyOtpToken = (email, otp, receivedToken) => {
    if (!receivedToken || !receivedToken.includes('.')) return false;

    const [receivedSignature, expiry] = receivedToken.split('.');
    
    // 1. Check if expired
    if (Date.now() > parseInt(expiry)) {
        console.log(`[VERIFY] OTP expired for ${email}`);
        return false;
    }

    // 2. Re-calculate the signature
    const secret = process.env.OTP_SECRET || 'fallback-secret-for-dev-only-123';
    const data = `${email.toLowerCase()}:${otp}:${expiry}`;
    const expectedSignature = crypto.createHmac('sha256', secret).update(data).digest('hex');

    // 3. Compare them securely
    const isValid = crypto.timingSafeEqual(
        Buffer.from(receivedSignature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
    );

    return isValid;
};

// --- LEGACY FALLBACKS (to prevent import errors while migrating) ---
export const saveOtp = () => {}; 
export const getOtp = () => null;
export const deleteOtp = () => {};
