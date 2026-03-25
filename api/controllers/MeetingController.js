const Meeting = require("../models/Meeting");

module.exports = {

    // מביא את כל ה-meetings שהמשתמש הוא היוצר
    getMeetingsByCreator: async (req, res) => {
        try {
            const userId = req.params.userId;
            const meetings = await Meeting.find({ creatorUserId: userId });
            res.status(200).json(meetings);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // מביא את כל ה-meetings שהמשתמש הוא משתתף
    getMeetingsByParticipant: async (req, res) => {
        try {
            const userId = req.params.userId;
            const meetings = await Meeting.find({ participantUserId: userId, status: "Pending" });
            res.status(200).json(meetings);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

        getAcceptedMeetingsByCreator: async (req, res) => {
        try {
            const userId = req.params.userId;

            const meetings = await Meeting.find({
                status: "Accepted",
            
                     creatorUserId: userId
                
            });

            res.status(200).json(meetings);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // מביא את כל ה-meetings שהמשתמש הוא משתתף ואושרו
    getAcceptedMeetingsByParticipant: async (req, res) => {
        try {
            const userId = req.params.userId;

            const meetings = await Meeting.find({
                status: "Accepted",
            
                     participantUserId: userId 
                
            });

            res.status(200).json(meetings);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // יצירת פגישה
    createMeeting: async (req, res) => {
        try {
            const { title, description, date, time, location, creatorUserId, participantUserId } = req.body;

            if (!title || !date || !time || !creatorUserId || !participantUserId) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            const meeting = new Meeting({
                title,
                description,
                date,
                time,
                location,
                creatorUserId,
                participantUserId,
                status: "Pending"
            });

            await meeting.save();
            res.status(201).json(meeting);

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // מחיקה
    deleteMeeting: async (req, res) => {
        try {
            const { userId, id } = req.params;

            const meeting = await Meeting.findOneAndDelete({
                _id: id,
                $or: [
                    { creatorUserId: userId },
                    { participantUserId: userId }
                ]
            });

            if (!meeting) {
                return res.status(404).json({
                    message: "Meeting not found or you don't have permission"
                });
            }

            res.status(200).json({ message: "Deleted successfully" });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // אישור פגישה
    acceptMeeting: async (req, res) => {
        try {
            const { id } = req.params;

            const meeting = await Meeting.findById(id);
            if (!meeting) {
                return res.status(404).json({ message: "Meeting not found" });
        
            }

            meeting.status = "Accepted";
            await meeting.save();

            res.status(200).json(meeting);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

        rejectMeeting: async (req, res) => {
        try {
            const { id } = req.params;

            const meeting = await Meeting.findById(id);
            if (!meeting) {
                return res.status(404).json({ message: "Meeting not found" });
        
            }

            meeting.status = "Rejected";
            await meeting.save();

            res.status(200).json(meeting);

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

};