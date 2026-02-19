const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /user
router.post("/", async (req, res) => {
    try {
        const { firebaseUid, email, name } = req.body;

        // בדיקה אם היוזר כבר קיים
        let user = await User.findOne({ firebaseUid });

        if (user) {
            return res.status(200).json(user);
        }

        // יצירת משתמש חדש
        user = new User({ firebaseUid, email, name });
        await user.save();

        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
