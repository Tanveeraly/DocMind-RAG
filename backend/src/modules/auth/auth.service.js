import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/env.js";
import * as model from "./auth.model.js";

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function signToken(user) {
  return jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: jwtExpiresIn });
}

async function register({ name, email, password }) {
  const normalized = email.trim().toLowerCase();
  if (await model.findByEmail(normalized)) {
    throw httpError(409, "Email already registered");
  }
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await model.create({ name: name.trim(), email: normalized, passwordHash });
  return { user, token: signToken(user) };
}

async function login({ email, password }) {
  const row = await model.findByEmail(email.trim().toLowerCase());
  const ok = row && (await bcrypt.compare(password, row.password_hash));
  if (!ok) throw httpError(401, "Invalid email or password");
  const user = { id: row.id, name: row.name, email: row.email };
  return { user, token: signToken(user) };
}

export default { register, login };