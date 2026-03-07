const express = require("express");
const router = express.Router();
const meetingController = require("../routes/MeetingController");

// מחזיר את כל הפגישות שהיוזר הוא היוצר
router.get("/creator/:userId", meetingController.getMeetingsByCreator);

// מחזיר את כל הפגישות שהיוזר הוא משתתף
router.get("/participant/:userId", meetingController.getMeetingsByParticipant);

// יצירת פגישה חדשה בין שני יוזרים
router.post("/", meetingController.createMeeting);

// מחיקת פגישה – רק אם היוזר הוא אחד מהמשתתפים
router.delete("/:userId/:id", meetingController.deleteMeeting);

module.exports = router;