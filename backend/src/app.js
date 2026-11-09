import express from "express";
import cors from "cors";
import env from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import documentRoutes from "./modules/documents/document.routes.js";
import chatRoutes from "./modules/chat/chat.routes.js";
const app = express();

app.use(cors({ origin: env.frontendUrl }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);
app.use(errorHandler);

export default app;