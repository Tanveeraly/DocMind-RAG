import pool from "../../config/db.js";

// Saves the document row and all its chunks atomically
export async function createWithChunks({ userId, originalName, s3Key, sizeBytes, chunks }) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `INSERT INTO documents (user_id, original_name, s3_key, size_bytes)
       VALUES ($1, $2, $3, $4)
       RETURNING id, original_name, size_bytes, uploaded_at`,
      [userId, originalName, s3Key, sizeBytes]
    );
    const doc = rows[0];

    // One query for all chunks: unnest turns the JS array into rows
    await client.query(
      `INSERT INTO chunks (document_id, chunk_index, content)
       SELECT $1, t.idx - 1, t.content
       FROM unnest($2::text[]) WITH ORDINALITY AS t(content, idx)`,
      [doc.id, chunks]
    );

    await client.query("COMMIT");
    return { ...doc, chunk_count: chunks.length };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function listByUser(userId) {
  const { rows } = await pool.query(
    `SELECT d.id, d.original_name, d.size_bytes, d.uploaded_at,
            COUNT(c.id)::int AS chunk_count
     FROM documents d
     LEFT JOIN chunks c ON c.document_id = d.id
     WHERE d.user_id = $1
     GROUP BY d.id
     ORDER BY d.uploaded_at DESC`,
    [userId]
  );
  return rows;
}

// Returns the row only if it belongs to this user
export async function findOwned(id, userId) {
  const { rows } = await pool.query(
    "SELECT * FROM documents WHERE id = $1 AND user_id = $2",
    [id, userId]
  );
  return rows[0];
}

// Chunks are removed automatically (ON DELETE CASCADE)
export async function remove(id) {
  await pool.query("DELETE FROM documents WHERE id = $1", [id]);
}