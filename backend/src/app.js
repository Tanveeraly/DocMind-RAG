import express from "express";
import cors from "cors";
import env from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import documentRoutes from "./modules/documents/document.routes.js";
import chatRoutes from "./modules/chat/chat.routes.js";
const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    const isAllowed =
      origin === env.frontendUrl ||
      origin === env.frontendUrl?.replace(/\/$/, "") ||
      origin.startsWith("http://localhost:") ||
      origin.startsWith("http://127.0.0.1:") ||
      /\.vercel\.app$/.test(new URL(origin).hostname);

    if (isAllowed) {
      return callback(null, true);
    }

    console.warn(`[CORS] Origin rejected: ${origin}`);
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);
app.use(errorHandler);

export default app;