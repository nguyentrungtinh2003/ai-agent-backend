import express from "express";
import auth from "../middleware/auth.middleware.js";
import userController from "../controllers/user.controller.js";
import fileHandler from "../middleware/upload.middleware.js";
const { upload } = fileHandler;

const router = express.Router();

router.post("/register", upload.single("img"), userController.register);
router.post("/login", userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

export default router;
