const httpStatus = require("http-status")
const {getAppointmentList, getAppointmentById, postAppointment, updateAppointment, deleteAppointment} = require("../service/service.appointment");


const handleAppointment = async (req, res) => {
    try{
        const allAppointment = await getAppointmentList();
        if (allAppointment.length>0) return res.status(200).json(allAppointment);
        else return res.status(204).json([]);
      }catch(error){ 
        return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: error })
    }
}

const handleAppointmentById = async (req, res) => {
    try{
        const { id } = req.params;
        const appointment = await getAppointmentById(id);
        if (appointment) return res.status(200).json(appointment);
        else return res.status(401).json([]);
      }catch(error){ 
        return res
        .status(400)
        .json({ error: error })
    }
}

const handleAddAppointment = async (req, res) => {
    try {
        const { doctorId, date, duration, appointmentType, patientName } = req.body;

        if (!doctorId || !date || !duration || !appointmentType || !patientName) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        const bookappointment = await postAppointment(req.body);
        console.log(bookappointment._id);

        if (bookappointment && bookappointment._id) {
            return res.status(200).json({ message: "Appointment booked successfully.", appointment: bookappointment });
        }

        return res.status(500).json({ error: "Slot already booked" });
    } catch (error) {
        return res.status(500).json({ error: error.message || "Something went wrong." });
    }
};


const handleUpdateAppointment = async (req, res) => {
    try {
        const { id } = req.query;
        const { date, duration } = req.body;

        if (!date || !duration || !id) return res.status(400).json({ error: "Date and duration are required." });
        
        const newAppointment = await updateAppointment(id, date, duration);
        if(newAppointment)
            return res.status(201).json({ message: "Appointment updated successfully.", newAppointment });
        else
            return res.status(500).json({ error: "Appointment update error" });

    }catch(error){
        return res.status(404).json({ error: error })
    }
}

const handleDeleteAppointment = async (req, res) => {
    try{
        const { id } = req.query;
        const result  = await deleteAppointment(id);
        if(result){
            return res.json({ message: "Appointment canceled successfully." });
        }else{
            return res.status(404).json({ error: "Appointment not found." });
        }
    }catch(error){
        return res.status(500).json({ error: "Internal server error." });
    }
}


module.exports = {handleAppointment, handleAppointmentById, handleAddAppointment, handleUpdateAppointment, handleDeleteAppointment};