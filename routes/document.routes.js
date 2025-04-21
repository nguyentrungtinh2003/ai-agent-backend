import express from "express";
import documentController from "../controllers/document.controller";
import auth from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/upload", upload.any(), auth, documentController.uploadDocument);

export default router;
