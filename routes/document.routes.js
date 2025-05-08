import express from "express";
import documentController from "../controllers/document.controller.js";
import auth from "../middleware/auth.middleware.js";
import fileHandler from "../middleware/upload.middleware.js";
const { upload } = fileHandler;

const router = express.Router();

router.post("/upload", upload.any(), auth, documentController.uploadDocument);
router.get("/all", auth, documentController.getAllDocument);
router.get("/:id", auth, documentController.getDocumentById);
router.put(
  "/update/:id",
  upload.any(),
  auth,
  documentController.updateDocument
);

export default router;
