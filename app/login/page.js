"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STEPS = {
    EMAIL: 'EMAIL',
    PASSWORD: 'PASSWORD',
    NOT_FOUND: 'NOT_FOUND',
    OTP: 'OTP'
};

export default function LoginPage() {
    const { 
        loginWithGoogle, 
        signInAnonymously, 
        checkUserExists, 
        loginWithEmail,
        sendOtp, 
        verifyOtp,
        resetPassword,
        sendFailedLoginAlert
    } = useAuth();
    
    const router = useRouter();
    
    const [step, setStep] = useState(STEPS.EMAIL);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertSent, setAlertSent] = useState(false);

    const handleCheckEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const exists = await checkUserExists(email);
            if (exists) {
                setStep(STEPS.PASSWORD);
            } else {
                setStep(STEPS.NOT_FOUND);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await loginWithEmail(email, password);
            router.push("/");
        } catch (err) {
            console.log("Login Error Code:", err.code);
            // Firebase returns specific codes for account vs password issues
            if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                // If it's a generic invalid-credential, we check if they might be a new user
                setStep(STEPS.NOT_FOUND);
            } else {
                setError("Incorrect password. Please try again.");
                // Send security alert for failed password attempt (only once per session)
                if (!alertSent) {
                    sendFailedLoginAlert(email);
                    setAlertSent(true);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async () => {
        if (!email) {
            setError("Please enter an email address first.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            // Check if user exists first (as requested for security/flow)
            const exists = await checkUserExists(email);
            if (!exists) {
                setStep(STEPS.NOT_FOUND);
                return;
            }

            const res = await sendOtp(email);
            if (res.success) {
                setStep(STEPS.OTP);
            } else {
                setError(res.message);
                alert("Error: " + res.message);
            }
        } catch (err) {
            setError("Failed to send OTP.");
            alert("Failed to send OTP. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await verifyOtp(email, otp);
            if (res.success) {
                router.push("/"); 
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError("Verification failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await loginWithGoogle();
            router.push("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email first.");
            setStep(STEPS.EMAIL);
            return;
        }
        setLoading(true);
        setError("");
        setInfo("");
        try {
            await resetPassword(email);
            setInfo("Password reset email sent! Please check your inbox.");
        } catch (err) {
            console.error("Reset Error:", err);
            setError("Failed to send reset email. Please check the email address.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                                <h1>{step === STEPS.NOT_FOUND ? "Account Not Found" : "Welcome Back"}</h1>
                <p>
                    {step === STEPS.NOT_FOUND 
                        ? "We couldn't find an account with that email." 
                        : "Sign in to your account"}
                </p>

                {error && <div className="auth-error">{error}</div>}
                {info && <div className="auth-info" style={{color: '#2e7d32', background: '#e8f5e9', padding: '10px', borderRadius: '8px', fontSize: '14px', marginBottom: '15px', borderLeft: '4px solid #2e7d32'}}>{info}</div>}

                {step === STEPS.EMAIL && (
                    <form onSubmit={handleCheckEmail} className="auth-form">
                        <div className="auth-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="auth-input"
                                placeholder="name@example.com"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="auth-btn-primary">
                            {loading ? "Checking..." : "Continue with Password"}
                        </button>

                        <div className="auth-divider" style={{margin: '1.2rem 0'}}>
                            <span>OR</span>
                        </div>

                        <button 
                            type="button" 
                            onClick={() => {
                                if (!email) {
                                    alert("Please enter your email address first.");
                                    return;
                                }
                                handleSendOtp();
                            }}
                            disabled={loading}
                            className="auth-btn-social"
                            style={{borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)', fontWeight: '600', width: '100%', padding: '12px'}}
                        >
                            {loading ? "Please wait..." : "Sign in with OTP (Passwordless)"}
                        </button>
                    </form>
                )}

                {step === STEPS.PASSWORD && (
                    <form onSubmit={handlePasswordLogin} className="auth-form">
                        <div className="auth-group">
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="auth-input"
                                placeholder="••••••••"
                                autoFocus
                            />
                        </div>
                        <button type="submit" disabled={loading} className="auth-btn-primary">
                            {loading ? "Signing in..." : "Sign in with Password"}
                        </button>
                        
                        <div className="auth-divider" style={{margin: '1rem 0'}}>
                            <span style={{fontSize: '12px', color: '#999'}}>OR</span>
                        </div>

                        <button 
                            type="button" 
                            onClick={handleSendOtp}
                            disabled={loading}
                            className="auth-btn-social"
                            style={{borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)', fontWeight: '600', padding: '12px', width: '100%'}}
                        >
                            {loading ? "Please wait..." : "Sign in with OTP (Passwordless)"}
                        </button>
                        
                        <div style={{marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <button 
                                type="button" 
                                onClick={handleForgotPassword}
                                style={{background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '13px', textDecoration: 'none'}}
                            >
                                Forgot Password?
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(STEPS.EMAIL)}
                                style={{background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '13px', textDecoration: 'none'}}
                            >
                                Change Email
                            </button>
                        </div>
                    </form>
                )}

                {step === STEPS.OTP && (
                    <form onSubmit={handleVerifyOtp} className="auth-form">
                        <div className="auth-group">
                            <label>Verification Code</label>
                            <input
                                type="text"
                                required
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                className="otp-input-large"
                                placeholder="000000"
                                autoFocus
                            />
                            <p style={{textAlign: 'center', fontSize: '12px', marginTop: '10px', color: '#888'}}>
                                Code sent to {email}
                            </p>
                        </div>
                        <button type="submit" disabled={loading} className="auth-btn-primary">
                            {loading ? "Verifying..." : "Verify & Sign in"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep(STEPS.PASSWORD)}
                            style={{background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '14px', marginTop: '10px'}}
                        >
                            Back to Password
                        </button>
                    </form>
                )}

                {step === STEPS.NOT_FOUND && (
                    <div className="auth-form">
                        <p style={{marginBottom: '20px', fontSize: '16px', fontWeight: '500'}}>
                            No account found with this email. Please create a new one.
                        </p>
                        <Link href="/signup" className="auth-btn-primary" style={{textDecoration: 'none', textAlign: 'center', display: 'block'}}>
                            Create New Account
                        </Link>
                        <button
                            type="button"
                            onClick={() => setStep(STEPS.EMAIL)}
                            style={{background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '14px', marginTop: '20px'}}
                        >
                            Try a different email
                        </button>
                    </div>
                )}

                <div className="auth-divider">
                    <span>Or continue with</span>
                </div>

                <div className="auth-social-grid">
                    <button onClick={handleGoogleLogin} className="auth-btn-social">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83c.87-2.6 3.3-4.53 12-5.38z"/>
                        </svg>
                        <span>Sign in with Google</span>
                    </button>
                    <button
                        onClick={async () => {
                            try {
                                await signInAnonymously();
                                router.push("/");
                            } catch (err) {
                                setError(err.message);
                            }
                        }}
                        className="auth-btn-social"
                    >
                        <span>Continue as Guest</span>
                    </button>
                </div>

                <div className="auth-footer">
                    Don't have an account?{" "}
                    <Link href="/signup">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
