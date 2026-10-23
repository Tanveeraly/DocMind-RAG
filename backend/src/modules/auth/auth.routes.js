
import rateLimit from "express-rate-limit";
import controller from "./auth.controller.js";
import requireAuth from "../../middleware/auth.middleware.js";
import { Router } from "express";

const router = Router();

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20 });

router.post("/register", authLimiter, controller.register);
router.post("/login", authLimiter, controller.login);
router.get("/me", requireAuth, controller.me);

export default router;