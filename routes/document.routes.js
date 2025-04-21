import express from "express";
import documentController from "../controllers/document.controller";
import auth from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware.js";

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
