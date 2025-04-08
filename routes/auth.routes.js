import express from "express";
import jwt from "jwt";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.getSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPass });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (e) {
    res.status(500).send("Server error " + e.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (e) {
    res.status(500).send("Server error " + e.message);
  }
});
