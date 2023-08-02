const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    travelAgentId: {type: String, required: true},
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    notes: { type: String }
});

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
