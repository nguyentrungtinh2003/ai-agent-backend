import express from "express";
import auth from "../middleware/auth.middleware";
import userController from "../controllers/user.controller";

const router = express.Router();

router.post("/register", auth, userController.register);

router.post("/login", auth, userController.login);

module.exports = router;
