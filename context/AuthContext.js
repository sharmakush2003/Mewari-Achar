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
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const sendAuthAlert = async (user, type) => {
        try {
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

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
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
        // Check if user exists in Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email || null,
                displayName: user.displayName || 'Guest User',
                photoURL: user.photoURL || null,
                createdAt: serverTimestamp(),
                isAnonymous: user.isAnonymous,
            });
            // New user -> Signup alert
            if (!user.isAnonymous) {
                await sendAuthAlert(user, 'signup');
            }
        } else {
            // Existing user -> Login alert
            if (!user.isAnonymous) {
                await sendAuthAlert(user, 'login');
            }
        }
    };

    const signOut = async () => {
        await firebaseSignOut(auth);
    };

    // OTP Methods
    const sendOtp = async (email) => {
        const response = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        return await response.json();
    };

    const verifyOtp = async (email, otp) => {
        const response = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp }),
        });
        return await response.json();
    };

    const loginWithEmail = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await sendAuthAlert(result.user, 'login');
        return result.user;
    };

    const signupWithEmail = async (email, password, displayName) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        
        // Update Firestore
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: displayName || 'New User',
            createdAt: serverTimestamp(),
            isAnonymous: false,
        });

        await sendAuthAlert(user, 'signup');
        return user;
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            signInWithGoogle, 
            signInAnonymously, 
            signOut, 
            sendOtp, 
            verifyOtp,
            loginWithEmail,
            signupWithEmail
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
