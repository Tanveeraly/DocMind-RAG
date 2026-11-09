import pool from "../../config/db.js";

async function createConversation({ userId, documentId, title }) {
  const { rows } = await pool.query(
    `INSERT INTO conversations (user_id, document_id, title)
     VALUES ($1, $2, $3)
     RETURNING id, document_id, title, created_at`,
    [userId, documentId, title]
  );
  return rows[0];
}

async function findConversationOwned(id, userId) {
  const { rows } = await pool.query(
    "SELECT id, document_id, title FROM conversations WHERE id = $1 AND user_id = $2",
    [id, userId]
  );
  return rows[0] || null;
}

async function addMessage({ conversationId, role, content, sources = null }) {
  await pool.query(
    `INSERT INTO messages (conversation_id, role, content, sources)
     VALUES ($1, $2, $3, $4)`,
    [conversationId, role, content, sources ? JSON.stringify(sources) : null]
  );
}

async function listConversations(userId) {
  const { rows } = await pool.query(
    `SELECT id, document_id, title, created_at
     FROM conversations WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );
  return rows;
}

async function listMessages(conversationId) {
  const { rows } = await pool.query(
    `SELECT id, role, content, sources, created_at
     FROM messages WHERE conversation_id = $1 ORDER BY created_at, id`,
    [conversationId]
  );
  return rows;
}

export default {
  createConversation,
  findConversationOwned,
  addMessage,
  listConversations,
  listMessages,
};