import express from "express";
import auth from "../middleware/auth.middleware.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/all", auth, userController.getAllUser);
router.get("/:id", auth, userController.getUserById);
router.get("/search/:username", auth, userController.searchUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

export default router;
