import jwt from "jsonwebtoken";
import env from "../config/env.js";

export default function requireAuth(req, res, next) {
  const [scheme, token] = (req.headers.authorization || "").split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Missing token" });
  }
  try {
    req.userId = Number(jwt.verify(token, env.jwtSecret).sub);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}