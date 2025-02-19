const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, lowercase: true, required: true, unique: true },
  workingHours: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
