const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /user
router.post("/", async (req, res) => {
    try {
        const { firebaseUid, email, name, role } = req.body;

        // בדיקה אם היוזר כבר קיים
        let user = await User.findOne({ firebaseUid });

        if (user) {
            return res.status(200).json(user);
        }

        // יצירת משתמש חדש
        user = new User({ firebaseUid, email, name, role });
        await user.save();

        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ GET /user  → מחזיר את כל המשתמשים
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/:uid", async (req, res) => {
        try {
            const { uid } = req.params;

            const user = await User.findOne({ firebaseUid: uid });

            if (!user) {
                console.log("cannot find user with firebase uid as: " + uid);
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });


module.exports = router;
