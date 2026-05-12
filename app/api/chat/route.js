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
                    1. Price List: Give the rates for 500g and 1kg jars in a numbered list.
                    2. Ordering: Provide a beautiful, structured list with emojis and numbers.
                    
                    Royal Rates 👑:
                    
                    1. 🥭 Mango Achaar: 500g: ₹180, 1kg: ₹359. [ORDER:Mango Achaar]
                    2. 🌿 Ginger (Adrak) Achaar: 500g: ₹290, 1kg: ₹579. [ORDER:Ginger (Adrak) Achaar]
                    3. 🌶️ Mirchi Achaar: 500g: ₹150, 1kg: ₹299. [ORDER:Mirchi Achaar]
                    4. 🧄 Garlic (Lahsun) Achaar: 500g: ₹240, 1kg: ₹479. [ORDER:Garlic (Lahsun) Achaar]
                    5. 🌕 Turmeric (Haldi) Achaar: 500g: ₹200, 1kg: ₹399. [ORDER:Turmeric (Haldi) Achaar]
                    6. 🍈 Amla Achaar: 500g: ₹175, 1kg: ₹349. [ORDER:Amla Achaar]
                    
                    For Bulk/Custom orders, guide them to 'Contact Team' or WhatsApp +91 70141 02742.
                    
                    IMPORTANT FORMATTING RULES: 
                    - NEVER put the first product (1. 🥭 Mango Achaar) on the same line as your introduction. 
                    - ALWAYS start the numbered list with a BLANK LINE before it.
                    - List each product ONLY ONCE.
                    - Always use a NUMBERED LIST (1., 2., 3., etc.).
                    - Use emojis (🥭, 🌶️, 🧄, etc.).
                    - Always use the tag [ORDER:ProductName] for buttons.
                    - Be extremely polite (Hukum, Sa).`
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
