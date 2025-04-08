import express from "express";
import bcrypt from "bcryptjs";
import auth from "../middleware/auth.middleware";
import User from "../models/user.model";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).send("Server error " + err.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error " + err.message);
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
    res.json({ msg: "User updated", user });
  } catch (err) {
    res.status(500).send("Server error " + err.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("search/:username", auth, async (req, res) => {
  try {
    const keyword = req.params.username;
    const users = await User.find({
      username: { $regex: keyword, $options: "i" },
    }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
});
