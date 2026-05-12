"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="royal-logo-pulse">
                    <img src="/favicon.png" alt="Mewari Achaar Logo" className="loader-logo" />
                    <div className="logo-text-stack">
                        <span className="mewari-text">Mewari</span>
                        <span className="achar-text">Achaar</span>
                    </div>
                </div>
                
                <div className="royal-spinner">
                    <div className="spinner-inner"></div>
                </div>

                <h2 className="loading-tagline">
                    मेवाड़ी स्वाद की विरासत तैयार हो रही है...
                </h2>
            </div>
        </div>
    );
}
