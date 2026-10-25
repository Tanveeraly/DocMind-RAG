import multer from "multer";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE, files: 1 },
  fileFilter(req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      const err = new Error("Only PDF files are allowed");
      err.status = 400;
      return cb(err);
    }
    cb(null, true);
  },
});

// The frontend must send the file in a form field named "file"
export const uploadPdf = upload.single("file");