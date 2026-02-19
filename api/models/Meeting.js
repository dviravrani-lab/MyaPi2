const mongoose = require("mongoose");


const MeetingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String },           
    creatorUserId: { type: String, required: true },      
    participantUserId: { type: String, required: true }  
}, { timestamps: true });

module.exports = mongoose.model("Meeting", MeetingSchema);

