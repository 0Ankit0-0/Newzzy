const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../Models/User");

router.post("/signup", async (req, res) => {
    try {
        const { username, password, email, mobileNo } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const user = new User({ username, password, email, mobileNo });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({ token, user, success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

module.exports = router;
