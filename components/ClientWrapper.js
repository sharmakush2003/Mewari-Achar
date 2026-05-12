"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export default function ClientWrapper({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ensure the loader stays for a bit for premium feel
        // and to allow hydration to complete
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading && <LoadingScreen />}
            <div style={{ 
                visibility: loading ? 'hidden' : 'visible',
                opacity: loading ? 0 : 1,
                transition: 'opacity 0.5s ease-in-out'
            }}>
                {children}
            </div>
        </>
    );
}
