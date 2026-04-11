import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// Helper for timeout
const withTimeout = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
    ]);
};

export async function POST(req) {
    try {
        const { email } = await req.json();
        
        if (!email) {
            return Response.json({ success: false, message: "Email is required" }, { status: 400 });
        }

        // We query the 'users' collection with a strict 3-second timeout
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", email));
            const querySnapshot = await withTimeout(getDocs(q), 3000);
            
            return Response.json({ 
                success: true, 
                exists: !querySnapshot.empty 
            });
        } catch (dbError) {
            console.error("Firestore availability check failed or timed out:", dbError.message);
            // If DB hangs (like when API is disabled), we assume user doesn't exist 
            // to allow them to proceed to the signup flow safely.
            return Response.json({ 
                success: true, 
                exists: false,
                warning: "Database unavailable, falling back to signup flow."
            });
        }
    } catch (error) {
        console.error("Critical error in check-user API:", error);
        return Response.json({ 
            success: false, 
            message: "Internal server error", 
            error: error.message 
        }, { status: 500 });
    }
}
