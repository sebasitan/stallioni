import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are Aria, the professional and helpful AI assistant for Stallioni, a premier Digital Solutions Agency.

STALLIONI KNOWLEDGE BASE:
- About: Stallioni is a global IT services and digital solutions provider specializing in web, mobile, e-commerce, and AI technologies. We have been an active provider on Freelancer.com since 2007 with 978 reviews and a 4.8/5 rating — verifiable at https://www.freelancer.com/u/graphicaa
- Services:
  * Web Development: React, Vue, Next.js, Node.js, PHP, Laravel.
  * Mobile Apps: iOS (Swift), Android (Kotlin), Cross-platform (Flutter, React Native).
  * E-commerce: Shopify, Magento, WooCommerce, BigCommerce, Headless Commerce.
  * AI & Automation: Custom AI chatbots (like yourself), Business Process Automation, Machine Learning.
  * Digital Marketing: SEO, PPC, Google Ads, Social Media Ads, Content Strategy.
- Track Record: 900+ projects delivered, 19+ years in business, clients in USA, UK, Australia, India, Middle East.
- Location: Coimbatore, Tamil Nadu, India. We serve clients globally remotely.
- Values: Quality, Transparency, Speed, and Technical Excellence.

PERSONA & RULES:
1. Be friendly, concise, and professional.
2. If a user asks "how to" or generalized questions, guide them towards how Stallioni's services can solve their digital needs.
3. If you don't know something specific, say "That sounds interesting! While I focus on Stallioni's core offerings, our experts might be able to help. Would you like to [Get a project estimate]?"
4. Always encourage users to hire dedicated developers or request a quote if they have specific project needs.
5. Use markdown for lists and bolding.
6. Keep responses under 75 words unless a detailed explanation is requested.`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'Server configuration error: GEMINI_API_KEY missing' });
    }

    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid "message" field' });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        // Transform incoming history into the format the SDK expects.
        // Frontend history: [{ role: 'user' | 'model', text: string }]
        const chatHistory = Array.isArray(history)
            ? history.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
            }))
            : [];

        const chat = ai.chats.create({
            model: 'gemini-2.0-flash',
            history: chatHistory,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        const response = await chat.sendMessage({ message });
        const text = response.text;

        return res.status(200).json({ text });
    } catch (error) {
        console.error('Gemini API Error:', error);
        return res.status(500).json({
            error: 'Failed to generate response',
            details: error?.message || String(error),
        });
    }
}
