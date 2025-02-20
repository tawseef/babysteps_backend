const Doctor = require("../model/doctor.model");
const Appointment = require("../model/appointment.model");

const getAllDoctorsList = async () => {
  try {
    const doctorList = await Doctor.find();
        if (doctorList.length>0) return doctorList;
        else return null;
      } catch (error) {
        throw error;
      }
}

const checkTimeSlots = async (id, date)=>{
    const doctor = await Doctor.findById(id);
    if (doctor) {
      const { start, end } = doctor.workingHours;
      
      const startTime = new Date(`${date}T${start}`);
      const endTime = new Date(`${date}T${end}`);
      
      const appointments = await Appointment.find({
        doctorId: id,
        date: { $gte: startTime, $lt: endTime },
      });

      let availableSlots = [];
      let currentTime = new Date(startTime);

      while (currentTime < endTime) {
        let nextSlot = new Date(currentTime.getTime() + 30 * 60000);
        // const isBooked = bookedSlots.some((slot) => currentTime < slot.end && nextSlot > slot.start);
        const isBooked = appointments.some((slot) => currentTime < slot.end && nextSlot > slot.start);

        if (!isBooked) {
          availableSlots.push({
            start: currentTime.toISOString().slice(11, 16),
            end: nextSlot.toISOString().slice(11, 16),
          });
        }

        currentTime = nextSlot;
      }

    return availableSlots;
  }else throw error;
}


module.exports = {getAllDoctorsList, checkTimeSlots};
