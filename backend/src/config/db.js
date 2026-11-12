import pg from "pg";
import pgvector from "pgvector/pg";
import env from "./env.js";

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";
const isCloudDb =
  env.databaseUrl &&
  !env.databaseUrl.includes("localhost") &&
  !env.databaseUrl.includes("127.0.0.1") &&
  !env.databaseUrl.includes("@postgres:");

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl:
    process.env.DATABASE_SSL === "true" || (isProduction && isCloudDb)
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