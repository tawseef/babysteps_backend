const Appointment = require("../model/appointment.model");
const Doctor = require("../model/doctor.model");

const getAppointmentList = async () => {
    try {
        const appointmentList = await Appointment.find();
        if (appointmentList) return appointmentList;
        else return null;
    } catch (error) {
        throw error;
    }
}

const getAppointmentById = async (id) => {
    try {
        const appointmentList = await Appointment.find({id: id});
        if (appointmentList) return appointmentList;
        else return null;
    } catch (error) {
        throw error;
    }
}

const postAppointment = async (doctorId, date, duration, appointmentType, patientName) => {
    try{

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found." });

    const { start, end } = doctor.workingHours;
    if (!start || !end) return res.status(400).json({ error: "Doctor's working hours not set."});

    const apptStart = new Date(date);
    const apptEnd = new Date(apptStart.getTime() + duration * 60000);
    const workStart = new Date(`${date.split("T")[0]}T${start}`);
    const workEnd = new Date(`${date.split("T")[0]}T${end}`);

    if (apptStart < workStart || apptEnd > workEnd){
        return res.status(400).json({ error: "Appointment is outside working hours." });
    }

    const isSlotBooked = await Appointment.exists({
      doctorId,
      date: { $lt: apptEnd, $gte: apptStart },
    });

    if (isSlotBooked) return res.status(400).json({ error: "Time slot is already booked." });

    const appointment = await Appointment.create({ doctorId, date: apptStart, duration, appointmentType, patientName, notes });

    res.status(201).json({ message: "Appointment booked successfully.", appointment });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { getAppointmentList, getAppointmentById, postAppointment };