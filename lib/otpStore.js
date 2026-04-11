// This is a simple in-memory store for OTPs
// It's used as a fallback if the Firestore database is unavailable or the API is disabled.

if (!global.otpStore) {
    global.otpStore = {};
}

export const saveOtp = (email, otp) => {
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    global.otpStore[email.toLowerCase()] = { otp, expiry };
    console.log(`[OTP STORE] Saved for ${email}: ${otp}`);
};

export const getOtp = (email) => {
    const entry = global.otpStore[email.toLowerCase()];
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
        delete global.otpStore[email.toLowerCase()];
        return null;
    }

    return entry.otp;
};

export const deleteOtp = (email) => {
    delete global.otpStore[email.toLowerCase()];
};
