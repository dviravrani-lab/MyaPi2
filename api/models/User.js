const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true }, // שם מלא של היוזר
    role: { type: String, default: "user" } // user / manager / business
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
