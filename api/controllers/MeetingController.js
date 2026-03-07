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

        const meetings = await Meeting.find({ participantUserId: userId });

        res.status(200).json(meetings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
},
    // POST /meeting
    createMeeting: async (req, res) => {
        try {
            const { title, description, date, time, location, creatorUserId, participantUserId} = req.body;

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
            });

            await meeting.save();

            res.status(201).json(meeting);

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // DELETE /meeting/:userId/:id
    deleteMeeting: async (req, res) => {
        try {
            const { userId, id } = req.params;

            // אפשר למחוק רק אם היוזר הוא היוצר או המשתתף
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
    }
};
