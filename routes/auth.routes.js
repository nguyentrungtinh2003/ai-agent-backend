import express from "express";
import auth from "../middleware/auth.middleware.js";
import userController from "../controllers/user.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/register", upload.single("img"), auth, userController.register);
router.post("/login", auth, userController.login);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

export default router;
