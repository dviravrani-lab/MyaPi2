const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/MeetingController");

// מחזיר את כל הפגישות שהיוזר הוא היוצר
router.get("/creator/:userId", meetingController.getMeetingsByCreator);

// מחזיר את כל הפגישות שהיוזר הוא משתתף (Pending)
router.get("/participant/:userId", meetingController.getMeetingsByParticipant);

// מחזיר את כל הפגישות שהיוזר הוא משתתף ואושרו (Accepted)
router.get("/accepted/:userId", meetingController.getAcceptedMeetingsByParticipant);

// יצירת פגישה חדשה בין שני יוזרים
router.post("/", meetingController.createMeeting);

// מחיקת פגישה – רק אם היוזר הוא אחד מהמשתתפים
router.delete("/:userId/:id", meetingController.deleteMeeting);

// אישור פגישה
router.post("/accept/:id", meetingController.acceptMeeting);

router.post("/reject/:id", meetingController.rejectMeeting);


module.exports = router;