
import pdfParse from "pdf-parse/lib/pdf-parse.js"; // avoids the package's debug-mode quirk

import { chunkText } from "../../utils/chunker.js";
import { embedDocument } from "../embeddings/embedding.service.js";
import {
  uploadToS3,
  deleteFromS3,
  getDownloadUrl,
} from "../storage/storage.service.js";
import * as model from "./document.model.js";

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export async function processUpload(file, userId) {
  if (!file) throw httpError(400, 'No file uploaded (use the form field "file")');

  // The browser-sent MIME type can be faked, so check the real file signature
  if (file.buffer.subarray(0, 5).toString("latin1") !== "%PDF-") {
    throw httpError(400, "File is not a valid PDF");
  }

  let text;
  try {
    ({ text } = await pdfParse(file.buffer));
  } catch {
    throw httpError(422, "Could not read this PDF (it may be corrupted or password-protected)");
  }

  // PostgreSQL text columns cannot contain null bytes
  text = (text || "").replace(/\u0000/g, "").trim();
  const chunks = chunkText(text);
  if (chunks.length === 0) {
    throw httpError(422, "No readable text found. Scanned PDFs are not supported yet.");
  }

  const s3Key = await uploadToS3(file, userId);

  let doc;
  try {
    doc = await model.createWithChunks({
      userId,
      originalName: file.originalname,
      s3Key,
      sizeBytes: file.size,
      chunks,
    });
  } catch (err) {
    await deleteFromS3(s3Key).catch(() => {}); // don't leave an orphan file in S3
    throw err;
  }

  // If embedding fails (quota, network), keep the upload. Chunks stay unembedded and can be retried.
  try {
    await embedDocument(doc.id);
  } catch (err) {
    console.error("Embedding failed:", err.message);
  }

  return doc;
}


export const list = (userId) => model.listByUser(userId);

export async function getDownload(id, userId) {
  const doc = await model.findOwned(id, userId);
  if (!doc) throw httpError(404, "Document not found");
  return { url: await getDownloadUrl(doc.s3_key), filename: doc.original_name };
}

export async function remove(id, userId) {
  const doc = await model.findOwned(id, userId);
  if (!doc) throw httpError(404, "Document not found");
  await deleteFromS3(doc.s3_key); // if S3 fails, the DB row stays and the user can retry
  await model.remove(id);
}