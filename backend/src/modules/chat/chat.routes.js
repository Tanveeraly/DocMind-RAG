import { Router } from "express";
import rateLimit from "express-rate-limit";
import requireAuth from "../../middleware/auth.middleware.js";
import controller from "./chat.controller.js";

const router = Router();

// Protects your free Gemini quota
const chatLimiter = rateLimit({ windowMs: 60 * 1000, limit: 15 });

router.use(requireAuth);

router.post("/", chatLimiter, controller.ask);
router.get("/conversations", controller.listConversations);
router.get("/conversations/:id/messages", controller.getMessages);

export default router;