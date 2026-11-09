import model from "./chat.model.js";
import * as documentModel from "../documents/document.model.js";
import { embedQuery, generateAnswer } from "../llm/gemini.provider.js";
import { searchSimilar } from "../embeddings/embedding.service.js";

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

async function ask({ userId, question, documentId, conversationId }) {
  if (typeof question !== "string" || !question.trim()) {
    throw httpError(400, "Question is required");
  }
  question = question.trim();
  if (question.length > 1000) throw httpError(400, "Question is too long (max 1000 characters)");

  // Find or create the conversation (always owned by this user)
  let conversation;
  if (conversationId) {
    conversation = await model.findConversationOwned(conversationId, userId);
    if (!conversation) throw httpError(404, "Conversation not found");
  } else {
    if (documentId) {
      const doc = await documentModel.findOwned(documentId, userId);
      if (!doc) throw httpError(404, "Document not found");
    }
    conversation = await model.createConversation({
      userId,
      documentId: documentId || null,
      title: question.slice(0, 60),
    });
  }

  // Retrieve the best chunks, only from this user's documents
  const queryEmbedding = await embedQuery(question);
  const chunks = await searchSimilar({
    userId,
    queryEmbedding,
    documentId: conversation.document_id,
    limit: 4,
  });

  const answer = chunks.length
    ? await generateAnswer(question, chunks)
    : "I couldn't find any processed documents to answer from. Please upload a PDF first.";

  const sources = chunks.map((c) => ({
    chunkId: c.id,
    document: c.original_name,
    chunkIndex: c.chunk_index,
    score: Number(c.score.toFixed(3)),
    snippet: c.content.slice(0, 200),
  }));

  await model.addMessage({ conversationId: conversation.id, role: "user", content: question });
  await model.addMessage({ conversationId: conversation.id, role: "assistant", content: answer, sources });

  return { conversationId: conversation.id, answer, sources };
}

const listConversations = (userId) => model.listConversations(userId);

async function getMessages(conversationId, userId) {
  const conversation = await model.findConversationOwned(conversationId, userId);
  if (!conversation) throw httpError(404, "Conversation not found");
  return model.listMessages(conversationId);
}

export default { ask, listConversations, getMessages };