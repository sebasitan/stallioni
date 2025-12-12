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
                    parts: [{ text: "You are Aria, a helpful and professional AI assistant for Stallioni, a Digital Solutions Agency. You help users with web development, app development, and design services inquiries. Be concise and friendly." }]
                },
                {
                    role: "model",
                    parts: [{ text: "Hello! I'm Aria, your Stallioni Assistant. How can I help you today?" }]
                },
                ...chatHistory
            ],
            generationConfig: {
                maxOutputTokens: 500,
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
