const mongoose = require("mongoose");
// const Appointment=require("./Appointment");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // role: { type: String, required: true },
    avatar: { type: String, required: true },
    appointments: [{type: mongoose.Schema.Types.ObjectId}]
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
