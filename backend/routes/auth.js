
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ msg: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });
  await newUser.save();

  res.json({ msg: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user: { username: user.username, role: user.role } });
});

module.exports = router;
