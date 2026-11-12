import app from "./app.js";
import pool from "./config/db.js";
import env from "./config/env.js";

async function start() {
  await pool.query("SELECT 1");
  console.log("Database connected");

  const server = app.listen(env.port, () =>
    console.log(`Server running on port ${env.port}`)
  );

  const shutdown = (signal) => {
    console.log(`${signal} received, shutting down`);
    server.close(async () => {
      await pool.end();
      process.exit(0);
    });
  };
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

start().catch((err) => {
  console.error("Startup failed:", err.message || err);
  if (err.code === "ENOTFOUND") {
    console.error(
      "Hint: The database host could not be resolved. Please check your DATABASE_URL environment variable in Render."
    );
  }
  process.exit(1);
});