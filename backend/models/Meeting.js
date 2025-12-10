const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    businessName: String,
    name: String,
    email: String,
    serviceInterest: String,
    date: String,
    time: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meeting", meetingSchema);
