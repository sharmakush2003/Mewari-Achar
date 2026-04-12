import admin from 'firebase-admin';

/**
 * Lazy initialization for Firebase Admin.
 * Prevents build-time crashes and ensures we only initialize once.
 */
function getAdminApp() {
    if (admin.apps.length > 0) return admin.apps[0];

    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

    if (!serviceAccountJson) {
        console.warn("⚠️ FIREBASE_SERVICE_ACCOUNT not found. Admin SDK will not work.");
        return null;
    }

    try {
        const serviceAccount = JSON.parse(serviceAccountJson);
        return admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (error) {
        console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT:", error);
        return null;
    }
}

export const getAdminAuth = () => {
    const app = getAdminApp();
    return app ? admin.auth(app) : null;
};

export const getAdminFirestore = () => {
    const app = getAdminApp();
    return app ? admin.firestore(app) : null;
};
