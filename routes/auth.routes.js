import express from "express";
import auth from "../middleware/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", auth, userController.register);

router.post("/login", auth, userController.login);

module.exports = router;
