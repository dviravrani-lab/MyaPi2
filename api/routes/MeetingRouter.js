const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");

// מחזיר את כל הפגישות של היוזר (creator או participant)
router.get("/:userId", meetingController.getMeetings);

// יצירת פגישה חדשה בין שני יוזרים
router.post("/", meetingController.createMeeting);

// מחיקת פגישה – רק אם היוזר הוא אחד מהמשתתפים
router.delete("/:userId/:id", meetingController.deleteMeeting);

module.exports = router;
