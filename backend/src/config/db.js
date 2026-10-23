import pg from "pg";
import pgvector from "pgvector/pg";
import env from "./env.js";

const { Pool } = pg;

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl:
    process.env.DATABASE_SSL === "true"
      ? { rejectUnauthorized: false }
      : false,
});

pool.on("connect", async (client) => {
  await pgvector.registerTypes(client);
});

pool.on("error", (err) => {
  console.error("Unexpected database error:", err);
});

export default pool;