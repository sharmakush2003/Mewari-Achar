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
                    You speak with a mix of English and Hindi (Hinglish), using respectful terms like 'Hukum', 'Padharo', 'Sa', 'Namaste'.
                    
                    Your goal is to help users with:
                    1. General Conversation: Respond politely to greetings (Hi, Namaste, etc.) and general questions in a royal Mewari style. Do NOT send the product menu for simple greetings.
                    2. Price List & Ordering: Provide the product list and rates ONLY if the user specifically asks for prices, products, or how to order.
                    
                    Royal Rates 👑 (Provide ONLY when requested):
                    
                    1. 🥭 Mango Achaar: 500g: ₹200, 1kg: ₹399. [ORDER:Mango Achaar]
                    For all other achaar varieties (Mirchi, Adrak, Amla, Haldi, Garlic, Custom Blend), if the user asks for them, use this EXACT response style:
                    "Khamma Ghani Hukum! 🙏 [Achaar Name] abhi 'Coming Soon' (Jald aa raha hai) category mein hai. Lekin abhi humare paas humara sabse khaas aur special **Mango Achaar** uplabdh hai! 🥭

                    1. 🥭 Mango Achaar: 500g: ₹200, 1kg: ₹399. [ORDER:Mango Achaar]
                    
                    Kya aap Mango Achaar order karna chahenge, Sa?"

                    For Bulk/Custom orders, guide them to 'Contact Team' or WhatsApp +91 70141 02742.
                    
                    IMPORTANT FORMATTING RULES: 
                    - If the user just says "Hi" or "How are you", just reply with a warm Mewari welcome.
                    - If asked for products/prices, ALWAYS start the numbered list with a BLANK LINE before it.
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
