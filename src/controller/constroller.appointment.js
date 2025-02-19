const {getAppointmentList, getAppointmentById, postAppointment} = require("../service/service.appointment")


const handleAppointment = async (req, res) => {
    try{
        const allAppointment = await getAppointmentList();
        if (allAppointment) res.status(httpStatus.OK).json(allAppointment);
        else res.status(httpStatus.NOT_FOUND).json([]);
      }catch(error){ 
        res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: error })
    }
}

const handleAppointmentById = async (req, res) => {
    try{
        const { id } = req.params;
        const appointment = await getAppointmentById(id);
        if (appointment) res.status(httpStatus.OK).json(appointment);
        else res.status(httpStatus.NOT_FOUND).json([]);
      }catch(error){ 
        res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: error })
    }
}

const handleAddAppointment = async (req, res) => {
    try{
        const { doctorId, date, duration, appointmentType, patientName} = req.body;
        if (!doctorId || !date || !duration || !appointmentType || !patientName){
            return res.status(400).json({ error: "All required fields must be provided." }); 
        } 
        const bookappointment = await postAppointment(req.body);
        /////////////////////////////////////////
    }catch(error){
        res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: error })
    }

}


module.exports = {handleAppointment, handleAppointmentById, handleAddAppointment};