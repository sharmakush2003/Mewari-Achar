"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function SignupPage() {
    const router = useRouter();
    const { signupWithEmail, sendOtp, verifyOtp, signInAnonymously } = useAuth();
    
    const [step, setStep] = useState('email-entry'); // 'email-entry' | 'otp-verification'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await sendOtp(email);
            if (res.success) {
                setStep('otp-verification');
                setCountdown(300); 
            } else {
                setError(res.message || 'Failed to send verification code');
            }
        } catch (err) {
            setError('Failed to send verification code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAndSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const verifyRes = await verifyOtp(email, otp);
            if (!verifyRes.success) {
                setError(verifyRes.message || 'Invalid verification code');
                setLoading(false);
                return;
            }

            await signupWithEmail(email, password, displayName);
            router.push("/");
        } catch (err) {
            setError(err.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Create Account</h1>
                <p>
                    {step === 'email-entry' 
                        ? "Join the Mewari Special Achaar family" 
                        : `Enter the code sent to ${email}`}
                </p>

                {error && <div className="auth-error">{error}</div>}

                {step === 'email-entry' ? (
                    <form onSubmit={handleSendOTP} className="auth-form">
                        <div className="auth-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                required
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="auth-input"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="auth-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="auth-input"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="auth-group">
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="auth-input"
                            />
                        </div>
                        <div className="auth-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="auth-input"
                            />
                        </div>

                        <button type="submit" disabled={loading} className="auth-btn-primary">
                            {loading ? "Sending Code..." : "Send Verification Code"}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyAndSignup} className="auth-form">
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
                            />
                            {countdown > 0 && (
                                <p style={{textAlign: 'center', fontSize: '12px', marginTop: '10px', color: '#888'}}>
                                    Code expires in: <span style={{fontWeight: '700', color: 'var(--secondary-color)'}}>{formatTime(countdown)}</span>
                                </p>
                            )}
                        </div>

                        <button type="submit" disabled={loading || otp.length !== 6} className="auth-btn-primary">
                            {loading ? "Verifying..." : "Verify & Create Account"}
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => setStep('email-entry')}
                            style={{background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.9rem'}}
                        >
                            ← Back to details
                        </button>
                    </form>
                )}

                <div className="auth-divider">
                    <span>Or signup with</span>
                </div>

                <div style={{marginBottom: '20px'}}>
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
                        style={{width: '100%'}}
                    >
                        <span>Continue as Guest</span>
                    </button>
                </div>

                <div className="auth-footer">
                    Already have an account?{" "}
                    <Link href="/login">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
