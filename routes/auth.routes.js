import express from "express";
import auth from "../middleware/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", auth, userController.register);
router.post("/login", auth, userController.login);
router.post("/forgot-password", auth, userController.forgotPassword);

export default router;
