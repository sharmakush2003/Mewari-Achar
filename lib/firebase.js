import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALZOYCz3sOu4d5onVp0VVT6KbuwRPfAqI",
  authDomain: "mewari-achar.firebaseapp.com",
  projectId: "mewari-achar",
  storageBucket: "mewari-achar.firebasestorage.app",
  messagingSenderId: "180695539633",
  appId: "1:180695539633:web:827aac32b003f855d82790",
  measurementId: "G-WCNZTJMEYJ"
};

// Initialize Firebase (Singleton pattern for Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
