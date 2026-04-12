import * as admin from 'firebase-admin';

/**
 * Singleton for Firebase Admin SDK
 * This allows us to create users and generate custom tokens on the backend.
 */
function getAdminApp() {
  if (admin.apps.length === 0) {
    try {
      const serviceAccountContent = process.env.FIREBASE_SERVICE_ACCOUNT;
      
      if (serviceAccountContent) {
        // Handle escaped newlines in the private key if it's passed as a string
        const serviceAccount = JSON.parse(serviceAccountContent);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        console.log("[FIREBASE ADMIN] Initialized with Service Account.");
      } else {
        // Fallback for local dev if the env is missing during build time
        console.warn("[FIREBASE ADMIN] No Service Account found. Build-time fallback.");
        return null;
      }
    } catch (error) {
      console.error("[FIREBASE ADMIN] Initialization error:", error.message);
      return null;
    }
  }
  return admin.apps[0];
}

// Export lazy getters to avoid build-time crashes
export const getAdminAuth = () => {
  const app = getAdminApp();
  return app ? admin.auth(app) : null;
};

export const getAdminDb = () => {
  const app = getAdminApp();
  return app ? admin.firestore(app) : null;
};
