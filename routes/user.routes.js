import express from "express";
import bcrypt from "bcryptjs";
import auth from "../middleware/auth.middleware";
import User from "../models/user.model";
import { successResponse, errorResponse } from "../utils/apiResponse";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return successResponse(res, "Get all user success !", users);
  } catch (err) {
    return errorResponse(res, 500, "Something went wrong");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    return successResponse(
      res,
      `Get user by id ${req.params.id} success !`,
      user
    );
  } catch (err) {
    return errorResponse(res, 500, "Something went wrong");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let updatedFields = {};

    if (username) updatedFields.username = username;
    if (email) updatedFields.email = email;

    if (password) {
      const salt = await bcrypt.getSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(res.params.id, updatedFields, {
      new: true,
    });
    return successResponse(res, "Update user success !", user);
  } catch (err) {
    return errorResponse(res, 500, "Something went wrong");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return successResponse(
      res,
      `Delete user by id ${req.params.id} success !`,
      null
    );
  } catch (err) {
    return errorResponse(res, 500, "Something went wrong");
  }
});

router.get("search/:username", auth, async (req, res) => {
  try {
    const keyword = req.params.username;
    const users = await User.find({
      username: { $regex: keyword, $options: "i" },
    }).select("-password");
    return successResponse(
      res,
      `Search user by username ${req.params.username} success !`,
      users
    );
  } catch (err) {
    return errorResponse(res, 500, "Something went wrong");
  }
});

module.exports = router;
