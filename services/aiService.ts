import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserPreferences, Book } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const bookSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Title of the book" },
    author: { type: Type.STRING, description: "Author of the book" },
    genre: { type: Type.STRING, description: "Genre of the book" },
    description: { type: Type.STRING, description: "Short summary of the book (approx 30 words)" },
    reason: { type: Type.STRING, description: "Why this book fits the user's specific request" }
  },
  required: ["title", "author", "genre", "description", "reason"]
};

const recommendationSchema: Schema = {
  type: Type.ARRAY,
  items: bookSchema
};

export const getBookRecommendations = async (prefs: UserPreferences): Promise<Book[]> => {
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const prompt = `
    Recommend 5 books for a user with the following preferences:
    - Favorite Genres/Topics: ${prefs.favoriteGenres}
    - Last Book Read: ${prefs.lastRead}
    - Current Mood/Goal: ${prefs.mood}

    Provide diverse options. Ensure the "reason" field directly addresses the user's inputs.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: recommendationSchema,
        systemInstruction: "You are a knowledgeable and empathetic librarian. Your goal is to find the perfect book match."
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Book[];
    }
    return [];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};