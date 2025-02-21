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
        const appointment = await Appointment.find({ _id: id });
        if (appointment) return appointment;
        else return null;
    } catch (error) {
        throw error;
    }
}

const postAppointment = async ({ doctorId, date, duration, appointmentType, patientName }) => {
    try {
        const doctor = await Doctor.find({ _id: doctorId });
        if (!doctor) return res.status(404).json({ error: "Doctor not found." });
        const { start, end } = doctor[0].workingHours;
        if (!start || !end) return res.status(400).json({ error: "Doctor's working hours not set." });
        
        const apptStart = new Date(date);
        const apptEnd = new Date(apptStart.getTime() + duration * 60001);
        const workStart = new Date(`${date.split("T")[0]}T${start}:00.000Z`);
        const workEnd = new Date(`${date.split("T")[0]}T${end}:00.000Z`);
        
        // console.log(apptStart,workStart, apptEnd, workEnd)
        if (apptStart < workStart || apptEnd > workEnd) {
            console.log("apptStart,workStart, apptEnd, workEnd")
                return res.status(400).json({ error: "Appointment is outside working hours." });
            }
            
            const isSlotBooked = await Appointment.exists({
                doctorId,
                date: { $lt: apptEnd, $gte: apptStart },
            });
        
        
        if (isSlotBooked) return null
        
        const appointment = await Appointment.create({ doctorId, date: apptStart, duration, appointmentType, patientName });
        if (appointment)
            return appointment;
        else return null;

    } catch (error) {
        throw error;
    }
}


const updateAppointment = async (id, date, duration) => {
    const apptStart = new Date(date);
    const apptEnd = new Date(apptStart.getTime() + duration * 60000);
    
    let appointment = await Appointment.findById({_id:id}); 
    if (!appointment) return null;
    
    const conflict = await Appointment.exists({
        doctorId: appointment.doctorId,
        _id: { $ne: id }, 
        date: { $lt: apptEnd, $gte: apptStart },
    });

    if (conflict) return null;

    appointment.date = apptStart;
    appointment.duration = duration;
    await appointment.save(); 
    return appointment;
};


const deleteAppointment = async (id) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(id);
        return appointment;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAppointmentList, getAppointmentById, postAppointment, updateAppointment, deleteAppointment };