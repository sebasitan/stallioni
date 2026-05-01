import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'Server configuration error: GEMINI_API_KEY missing' });
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Transform frontend history to Gemini format
        // Frontend history: [{ role: 'user' | 'model', text: string }]
        // Gemini history: [{ role: 'user' | 'model', parts: [{ text: string }] }]
        const chatHistory = history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{
                        text: `You are Aria, the professional and helpful AI assistant for Stallioni, a premier Digital Solutions Agency. 
                    
                    STALLIONI KNOWLEDGE BASE:
                    - About: Stallioni is a global IT services and digital solutions provider specializing in cutting-edge web, mobile, e-commerce, and AI technologies.
                    - Services:
                      * Web Development: React, Vue, Next.js, Node.js, PHP, Laravel.
                      * Mobile Apps: iOS (Swift), Android (Kotlin), Cross-platform (Flutter, React Native).
                      * E-commerce: Shopify Plus, Magento, WooCommerce, Headless Commerce.
                      * AI & Automation: Custom AI chatbots (like yourself), Business Process Automation, Machine Learning.
                      * Digital Marketing: Growth-driven SEO, PPC, and content strategy.
                    - Track Record: 900+ projects delivered, 10+ years of experience, 150+ dedicated experts.
                    - Locations: Headquartered in Coimbatore, India, serving clients globally (USA, UK, Europe, Australia).
                    - Values: Quality, Transparency, Speed, and Technical Excellence.
                    
                    PERSONA & RULES:
                    1. Be friendly, concise, and professional.
                    2. If a user asks "how to get" or generalized questions, guide them towards how Stallioni's services can solve their digital needs.
                    3. If you don't know something specific about a service not listed, say "That sounds interesting! While I focus on Stallioni's core offerings, our experts might be able to help. Would you like to [Get a project estimate]?"
                    4. Always encourage users to hire dedicated developers or request a quote if they have specific project needs.
                    5. Use markdown for lists and bolding.
                    6. Keep responses under 75 words unless a detailed explanation is requested.` }]
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am Aria from Stallioni. I will provide helpful, professional, and concise information about our digital solutions and guide users to take the next step in their project journey." }]
                },
                ...chatHistory
            ],
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        return res.status(500).json({ error: 'Failed to generate response', details: error.message });
    }
}
