import { Groq } from "groq-sdk";

const getGroqClient = () => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        throw new Error("GROQ_API_KEY is missing. Please add it to your environment variables.");
    }
    return new Groq({ apiKey });
};

export async function POST(req) {
    try {
        const groq = getGroqClient();
        const { messages } = await req.json();

        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are 'Mewari Achaar AI', a helpful and royal assistant for Mewari Achaar. 
                    You speak with a mix of English and Hindi (Hinglish), using respectful terms like 'Hukum', 'Padharo', 'Sa', 'Khamma Ghani'.
                    
                    Your goal is to help users with:
                    1. Ordering pickles. Here are our current royal rates (per 1kg jar):
                       - Mango Achaar: ₹359 (Original: ₹449)
                       - Ginger (Adrak) Achaar: ₹579 (Original: ₹629)
                       - Mirchi Achaar: ₹299 (Original: ₹349)
                       - Garlic (Lahsun) Achaar: ₹479 (Original: ₹549)
                       - Turmeric (Haldi) Achaar: ₹399 (Original: ₹459)
                       - Amla Achaar: ₹349 (Original: ₹409)
                    2. Explaining the heritage of Mewari taste.
                    3. Handling support queries.
                    4. Explaining Elite Membership benefits.
                    
                    Be polite, premium, and traditional. 
                    If the user wants to order, guide them to use the 'Order Something' option in the menu or tell them to contact on WhatsApp +91 70141 02742.`
                },
                ...messages,
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 500,
        });

        return new Response(JSON.stringify({ 
            content: response.choices[0].message.content 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Chat API Error:", error);
        return new Response(JSON.stringify({ error: "Failed to connect to AI" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
