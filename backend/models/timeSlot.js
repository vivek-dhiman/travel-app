const mongoose = require("mongoose"); 

const timeSlotSchema = new mongoose.Schema(
  {
    travelAgentId: {type: mongoose.Schema.Types.ObjectId},
    timeSlotInfo: {type: Date}
  },
  { timestamps: true }
);

const timeSlot = mongoose.model("timeSlot", timeSlotSchema);
module.exports = timeSlot;