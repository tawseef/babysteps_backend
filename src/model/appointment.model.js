const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, 
  appointmentType: { type: String, required: true }, 
  patientName: { type: String, required: true }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;