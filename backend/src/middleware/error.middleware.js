import multer from "multer";

export default function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    const tooBig = err.code === "LIMIT_FILE_SIZE";
    return res.status(tooBig ? 413 : 400).json({
      error: tooBig ? "File too large (max 10 MB)" : err.message,
    });
  }
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({
    error: status === 500 ? "Internal server error" : err.message,
  });
}