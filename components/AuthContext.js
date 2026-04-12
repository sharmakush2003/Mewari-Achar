"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously as firebaseSignInAnonymously,
    signOut as firebaseSignOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithCustomToken,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

const AuthContext = createContext();
const withTimeout = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
    ]);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [otpToken, setOtpToken] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const sendAuthAlert = async (user, type) => {
        try {
            // For signups, we send the new premium welcome email
            if (type === 'signup') {
                try {
                    const welcomeResponse = await fetch(`${window.location.origin}/api/send-welcome`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: user.email, name: user.displayName }),
                    });
                    const result = await welcomeResponse.json();
                    console.log("[AUTH] Welcome email trigger result:", result);
                } catch (e) {
                    console.error("[AUTH] Welcome email fetch failed:", e);
                }
                return;
            }

            // For other alerts (logins), use the standard alert system
            await fetch('/api/send-login-alert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: user.email,
                    displayName: user.displayName,
                    deviceInfo: navigator.userAgent,
                    loginTime: new Date().toLocaleString(),
                    type: type,
                }),
            });
        } catch (error) {
            console.error("Failed to send auth alert:", error);
        }
    };

    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        await handleUserAuth(user);
        return user;
    };

    const signInAnonymously = async () => {
        const result = await firebaseSignInAnonymously(auth);
        const user = result.user;
        await handleUserAuth(user);
        return user;
    };

    const handleUserAuth = async (user) => {
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await withTimeout(getDoc(userRef), 3000);
            
            const isFirstTime = !userSnap.exists();

            if (isFirstTime) {
                await withTimeout(setDoc(userRef, {
                    uid: user.uid,
                    email: user.email || null,
                    displayName: user.displayName || 'Guest User',
                    photoURL: user.photoURL || null,
                    createdAt: serverTimestamp(),
                    isAnonymous: user.isAnonymous,
                }), 3000);
            }

            // Reliable trigger: If they didn't have a doc, it's a signup!
            if (!user.isAnonymous) {
                if (isFirstTime) {
                    await sendAuthAlert(user, 'signup');
                } else {
                    await sendAuthAlert(user, 'login');
                }
            }
        } catch (error) {
            console.warn("Firestore operation timed out or failed in handleUserAuth (Safe Mode):", error.message);
            // We still proceed so the UI doesn't hang
        }
    };

    const logout = async () => {
        await firebaseSignOut(auth);
    };

    const checkUserExists = async (email) => {
        try {
            const response = await fetch(`${window.location.origin}/api/check-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            return data.exists;
        } catch (error) {
            console.error("Auth check failed:", error);
            return false;
        }
    };

    const sendOtp = async (email) => {
        const response = await fetch(`${window.location.origin}/api/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (data.success && data.token) {
            setOtpToken(data.token);
        }
        return data;
    };

    const verifyOtp = async (email, otp) => {
        const response = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, token: otpToken }),
        });
        const data = await response.json();
        
        // If we received a customToken, sign in to Firebase Auth!
        if (data.success && data.customToken) {
            try {
                const userCredential = await signInWithCustomToken(auth, data.customToken);
                await handleUserAuth(userCredential.user);
            } catch (error) {
                console.error("Custom token sign-in failed:", error);
            }
        }
        
        return data;
    };

    const loginWithEmail = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await loginWithEmailSync(result.user);
        return result.user;
    };

    const loginWithEmailSync = async (user) => {
        await handleUserAuth(user);
        await sendAuthAlert(user, 'login');
    };

    const signupWithEmail = async (email, password, displayName) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        
        try {
            const userRef = doc(db, "users", user.uid);
            await withTimeout(setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: displayName || 'New User',
                createdAt: serverTimestamp(),
                isAnonymous: false,
            }), 3000);
        } catch (error) {
            console.warn("Could not save user profile to Firestore (Safe Mode):", error.message);
        }

        await sendAuthAlert(user, 'signup');
        return user;
    };

    const resetPassword = async (email) => {
        await sendPasswordResetEmail(auth, email);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            loginWithGoogle, 
            signInAnonymously, 
            logout, 
            sendOtp, 
            verifyOtp,
            loginWithEmail,
            signupWithEmail,
            checkUserExists,
            resetPassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
