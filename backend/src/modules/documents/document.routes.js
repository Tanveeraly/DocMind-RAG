import { Router } from "express";
import requireAuth from "../../middleware/auth.middleware.js";
import { uploadPdf } from "../../middleware/upload.middleware.js";
import * as controller from "./document.controller.js";

const router = Router();


router.use(requireAuth); // everything below needs a logged-in user

router.post("/", uploadPdf, controller.upload); // auth runs first, then multer
router.get("/", controller.list);
router.get("/:id/download", controller.download);
router.delete("/:id", controller.remove);

export default router;