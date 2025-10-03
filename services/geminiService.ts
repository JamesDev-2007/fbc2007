// FIX: Create file to provide AI services. This resolves module not found errors.
import { GoogleGenAI, GenerateContentResponse, Content, Type } from "@google/genai";
import type { Sermon } from '../types';

// FIX: Initialize the GoogleGenAI client.
// API key is handled by environment variables as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const chatbotModel = 'gemini-2.5-flash';

// A system instruction to guide the chatbot's personality and knowledge base.
const systemInstruction = `You are FBC AI, a friendly and knowledgeable Spiritual Growth Assistant for the First Baptist Church Itire.
Your goal is to provide information about the church and help users with their spiritual journey in a warm, welcoming, and respectful tone.

**Your Capabilities:**

1.  **Church Information:** Answer questions using the following details. If you don't know, politely suggest contacting the church.
    - Church Name: First Baptist Church Itire
    - Founded: 1970
    - Mission: To love God, love people, and make disciples of Jesus Christ.
    - Vision: To be a transformative presence in our community, known for our authentic faith, compassionate outreach, and commitment to biblical truth.
    - Core Beliefs: We believe in the Holy Trinity, the divinity of Jesus Christ, and the authority of the Bible as the inspired Word of God.
    - Pastor: Rev. Dr. S.O. Afolabi
    - Address: 123 Church Street, Itire, Lagos, Nigeria
    - Service Time: Sundays at 10:00 AM
    - Contact Email: info@fbcitire.org
    - Contact Phone: +234 123 456 7890
    - Ministries: Youth Ministry, Women's Fellowship, Men's Group, Music & Worship Team.

2.  **Biblical Knowledge:** You have deep knowledge of the Holy Bible. When asked a question about scripture, characters, or events, provide a clear answer and **always cite the relevant Bible verse(s)** (e.g., "As it says in John 3:16...").

3.  **Devotional Generation:** If a user asks for a devotional, provide a short, meaningful one. It must include:
    - A key Bible verse with its reference.
    - A brief reflection (2-4 sentences) on the verse's meaning and application.
    - A concluding short prayer or a thought-provoking question.

4.  **Spiritual Guidance:** For questions about faith, spiritual growth, confusion, or doubt, respond with empathy, wisdom, and encouragement. Base your answers on biblical principles and examples. Gently remind users that while you are a helpful tool, deep personal matters are best discussed with our pastors.

**General Instructions:**
- When asked for your identity, introduce yourself as FBC AI, a Spiritual Growth Assistant.
- Format your responses for clarity. Use markdown for bolding (**bold**). Do not use underline.
- Keep answers concise but informative.
`;


export const getChatbotResponse = async (history: Content[], newMessage: string): Promise<string> => {
  try {
    // FIX: Correctly call generateContent with model, contents, and config.
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: chatbotModel,
        contents: [...history, { role: 'user', parts: [{ text: newMessage }] }],
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            topP: 1,
            topK: 32,
        }
    });
    // FIX: Extract text directly from the response object, providing a fallback for undefined.
    return response.text ?? "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment.";
  } catch (error) {
    console.error("Error getting chatbot response:", error);
    return "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment.";
  }
};

export const getDailyScripture = async (): Promise<string> => {
    try {
        // FIX: Correctly call generateContent with a specific prompt for a scripture and thought.
        const response = await ai.models.generateContent({
            model: chatbotModel,
            contents: "Provide a single, encouraging Bible verse (including reference) and a short, one-sentence devotional thought based on it. Separate the verse and the thought with '||'. Example: 'For I know the plans I have for you,” declares the LORD, “plans to prosper you and not to harm you, plans to give you hope and a future.' - Jeremiah 29:11||This powerful promise reminds us that God's plan for our lives is filled with hope, even when we can't see the path ahead.",
            config: {
                temperature: 0.9,
                topP: 1,
                topK: 40,
                maxOutputTokens: 200,
                thinkingConfig: { thinkingBudget: 100 },
            }
        });
        // FIX: Extract text directly from the response object, returning an empty string if undefined.
        return response.text ?? '';
    } catch (error) {
        console.error("Error fetching daily scripture:", error);
        return "'The Lord is my shepherd; I shall not want.' - Psalm 23:1||This verse is a comforting reminder that in all circumstances, God provides for our needs.";
    }
};

export const findRelatedSermons = async (sermons: Sermon[], searchTerm: string): Promise<string[]> => {
    const sermonData = sermons.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        tags: s.tags.join(', ')
    })).map(s => `ID: ${s.id}, Title: "${s.title}", Description: "${s.description}", Tags: [${s.tags}]`).join('\n');

    const prompt = `
        You are a helpful church assistant. Your task is to find sermons related to a user's search query from the provided list.
        Analyze the user's query and the sermon data (title, description, tags).
        Return a JSON array of the string IDs for the most relevant sermons. Return up to 5 relevant sermon IDs.
        If no sermons are relevant, return an empty array.
        Only return the JSON array, nothing else.

        Sermon List:
        ${sermonData}

        User Query: "${searchTerm}"
    `;
    
    try {
        // FIX: Correctly call generateContent and request a JSON response.
        const response = await ai.models.generateContent({
            model: chatbotModel,
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING
                    }
                }
            }
        });

        // FIX: Safely handle potentially undefined response text before parsing.
        const jsonText = response.text?.trim();
        if (!jsonText) {
            return [];
        }
        const ids = JSON.parse(jsonText);
        return ids;
    } catch (error) {
        console.error("Error finding related sermons:", error);
        // Fallback to simple keyword matching if AI fails
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return sermons
            .filter(sermon =>
                sermon.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                sermon.description.toLowerCase().includes(lowerCaseSearchTerm) ||
                sermon.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
            )
            .map(sermon => sermon.id);
    }
};

export const getScriptureEncouragement = async (prayerRequest: string): Promise<string> => {
    const prompt = `
        A person has submitted a prayer request. Your task is to respond with a comforting and encouraging message based on Christian scripture.
        1. Start with a warm, empathetic opening.
        2. Provide one or two relevant Bible verses that speak to their situation. Include the reference (e.g., Psalm 23:4).
        3. Write a short, encouraging paragraph (2-3 sentences) explaining how those verses apply and offering a message of hope.
        4. Do not say "I will pray for you" as you are an AI. Instead, say something like "May you find comfort in God's word."

        Prayer Request: "${prayerRequest}"
    `;

    try {
        // FIX: Correctly call generateContent to generate an encouraging message.
        const response = await ai.models.generateContent({
            model: chatbotModel,
            contents: prompt,
            config: {
                temperature: 0.8,
                maxOutputTokens: 250,
                thinkingConfig: { thinkingBudget: 125 },
            }
        });
        // FIX: Extract text directly from the response object, providing a fallback for undefined.
        return response.text ?? "We hear your request. Remember the words from Psalm 46:1: 'God is our refuge and strength, an ever-present help in trouble.' May you find peace and comfort in knowing He is with you always.";
    } catch (error) {
        console.error("Error getting scripture encouragement:", error);
        return "We hear your request. Remember the words from Psalm 46:1: 'God is our refuge and strength, an ever-present help in trouble.' May you find peace and comfort in knowing He is with you always.";
    }
};