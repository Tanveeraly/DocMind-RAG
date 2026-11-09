import pgvector from "pgvector";
import pool from "../../config/db.js";
import { embedDocuments } from "../llm/gemini.provider.js";

const BATCH_SIZE = 50;

// Embeds every chunk of a document that has no embedding yet
export async function embedDocument(documentId) {
  const { rows } = await pool.query(
    `SELECT id, content FROM chunks
     WHERE document_id = $1 AND embedding IS NULL
     ORDER BY chunk_index`,
    [documentId]
  );

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const vectors = await embedDocuments(batch.map((r) => r.content));

    await pool.query(
      `UPDATE chunks SET embedding = v.emb::vector
       FROM unnest($1::int[], $2::text[]) AS v(id, emb)
       WHERE chunks.id = v.id`,
      [batch.map((r) => r.id), vectors.map((v) => pgvector.toSql(v))]
    );
  }
  return rows.length;
}

// Finds the chunks most similar to a question, only within this user's documents
export async function searchSimilar({ userId, queryEmbedding, documentId = null, limit = 5 }) {
  const { rows } = await pool.query(
    `SELECT c.id, c.content, c.chunk_index, d.original_name,
            1 - (c.embedding <=> $1::vector) AS score
     FROM chunks c
     JOIN documents d ON d.id = c.document_id
     WHERE d.user_id = $2
       AND c.embedding IS NOT NULL
       AND ($3::int IS NULL OR c.document_id = $3)
     ORDER BY c.embedding <=> $1::vector
     LIMIT $4`,
    [pgvector.toSql(queryEmbedding), userId, documentId, limit]
  );
  return rows;
}