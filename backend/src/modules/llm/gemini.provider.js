import { GoogleGenAI } from "@google/genai";
import config from "../../config/env.js";

if (!config.geminiApiKey) throw new Error("Missing env var: GEMINI_API_KEY");

const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

const MODEL = "gemini-embedding-001";
const DIMENSIONS = 768; // must match vector(768) in the database

async function embed(texts, taskType) {
  const res = await ai.models.embedContent({
    model: MODEL,
    contents: texts,
    config: { taskType, outputDimensionality: DIMENSIONS },
  });
  return res.embeddings.map((e) => e.values);
}
export async function generateAnswer(question, chunks) {
  const context = chunks
    .map((c, i) => `[${i + 1}] ${c.content}`)
    .join("\n\n");

  const res = await ai.models.generateContent({
    model: config.geminiChatModel,
    contents: `Context:\n${context}\n\nQuestion: ${question}`,
    config: {
      temperature: 0.2,
      systemInstruction:
        "You answer questions using ONLY the provided context. " +
        "If the answer is not in the context, say you could not find it in the document. " +
        "Do not make anything up. Mention source numbers like [1] where relevant.",
    },
  });
  return res.text;
}

// For document chunks being stored
export const embedDocuments = (texts) => embed(texts, "RETRIEVAL_DOCUMENT");

// For a user's question being searched
export const embedQuery = async (text) => (await embed([text], "RETRIEVAL_QUERY"))[0];