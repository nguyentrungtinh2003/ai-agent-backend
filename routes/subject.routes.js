import express from "express";
import subjectController from "../controllers/subject.controller.js";
import auth from "../middleware/auth.middleware.js";
import fileHandler from "../middleware/upload.middleware.js";
const { upload } = fileHandler;

const router = express.Router();

router.post("/add", upload.single("file"), auth, subjectController.addSubject);
router.get("/all", auth, subjectController.getAllSubject);
router.get("/:id", auth, subjectController.getSubjectById);
router.put(
  "/update/:id",
  upload.single("file"),
  auth,
  subjectController.updateSubject
);

export default router;
