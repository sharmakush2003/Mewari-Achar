"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export default function ClientWrapper({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Reduced to 1.5s for a balance between premium feel and speed
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? <LoadingScreen /> : children}
        </>
    );
}
