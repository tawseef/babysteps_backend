const Appointment = require("../model/appointment.model");

const getAppointmentList = async () => {
    try {
        const appointmentList = await Appointment.find();
        if (appointmentList) return appointmentList;
        else return null;
    } catch (error) {
        throw error;
    }
}

module.exports = { getAppointmentList };